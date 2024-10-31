const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Project = require('../models/project');
const Task = require('../models/task');

// Define TaskType
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        projectId: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        project: {
            type: ProjectType,
            resolve(parent) {
                return Project.findById(parent.projectId);
            }
        }
    })
});

// Define ProjectType
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent) {
                return Task.find({ projectId: parent.id });
            }
        } 
    })
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Task.findById(args.id).catch(err => {
                    throw new Error('Task not found');
                });
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id).catch(err => {
                    throw new Error('Project not found');
                });
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                return Project.find({});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve() {
                return Task.find({});
            }
        },
    }),
});

// Define Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                });
                return project.save().catch(err => {
                    throw new Error('Error saving project');
                });
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId
                });
                return task.save().catch(err => {
                    throw new Error('Error saving task');
                });
            },
        },
    }
});

// Export the GraphQL Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});