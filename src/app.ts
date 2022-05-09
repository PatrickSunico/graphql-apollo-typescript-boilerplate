import express from "express";
import morgan from "morgan";
// Apollo Server
import { ApolloServer } from "apollo-server-express";
// Schema
import { typeDefs, resolvers } from "./graphql";

// Express app
const app = express();
const PORT = process.env.PORT || 8000;

// initializing a apollo server must asynchronous
const startServer = async () => {
 // typeDefs - string representing the graphql schema
 // resolvers - a map of functions that implement the schema
 const server = new ApolloServer({ typeDefs, resolvers });
 await server.start();
 server.applyMiddleware({ app, path: "/api" });
};

startServer();

app.listen(PORT, () => {
 console.log(`Server Running at ${PORT}`);
});

console.log(`[app]: http://localhost:${PORT}`);
