const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Use your updated connection string here
const uri = 'mongodb+srv://frankblation:SpSyKfYRMX4bsSjm@atlascluster.dkfih.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
