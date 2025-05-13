// src/graphql.ts
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    image: String
  }

  type Query {
    products: [Product]
  }
`;

export const resolvers = {
  Query: {
    products: () => []
  }
};
