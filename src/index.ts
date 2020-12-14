import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ProductResolver } from './resolvers/product';
import { Product } from './entity/Product';


const main = async () => {
  const connection = await createConnection({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost/vitrine',
    entities: [ Product ],
    synchronize: true
  })

  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ ProductResolver ],
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  });
};

main().catch(error => {
  console.error(error);
});