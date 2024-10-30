
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = graphql;

// Define TaskType with fields
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

// Root Query to fetch a single task as an example
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Placeholder for fetching data (e.g., from a database)
        return {
          id: args.id,
          title: 'Sample Task',
          weight: 10,
          description: 'This is a sample task',
        };
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
