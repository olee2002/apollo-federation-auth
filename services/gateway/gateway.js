import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import AppSource from "./gatewaySource";

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "auth",
      url: "http://localhost:4001/graphql"
      //url: `${process.env.AUTH_DOMAIN}${process.env.GRAPHQL_PATH}`,
      // http://localhost:4001/graphql
    },
    {
      name: "course",
      url:"http://localhost:4002/graphql"
      //url: `${process.env.COURSE_DOMAIN}${process.env.GRAPHQL_PATH}`,
      // http://localhost:4002/graphql
    },
    {
      name: "student",
      url: "http://localhost:4003/graphql"
      //url: `${process.env.STUDENT_DOMAIN}${process.env.GRAPHQL_PATH}`,
      // http://localhost:4003/graphql
    },
  ],
  buildService({ name, url }) {
    return new AppSource({ url });
  },
});


const apolloServer = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => ({ req, res: req.res }),
});

const app = express();
apolloServer.applyMiddleware({ app, cors: false });

app.listen(process.env.GATEWAY_PORT||3000); // 3000
console.log(`Gateway server started at domain: ${process.env.GATEWAY_DOMAIN||3000}`); // http://localhost:3000
