const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const graphQLSchema = require('swagger-to-graphql');

const API_BASE_URL = 'https://api.sipgate.com/v2';

graphQLSchema('./swagger.json').then(schema => {
  app.use('/graphql', graphqlHTTP(req => {
    const authorization = req.param('authorization');
    console.log({ authorization });
    return {
      schema,
      context: {
        GQLProxyBaseUrl: API_BASE_URL,
        BearerToken: `Bearer ${authorization}`
      },
      graphiql: true
    };
  }));

  app.listen(3009, 'localhost', () => {
    console.info(`API is here localhost:3009/graphql`);
  });
}).catch(e => {
  throw e;
});