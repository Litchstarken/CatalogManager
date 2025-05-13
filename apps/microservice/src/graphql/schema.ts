import { gql } from 'apollo-server-express';

// Definimos el schema GraphQL usando el lenguaje SDL
export const typeDefs = gql`
  # Tipo Product con los campos del catálogo
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    image: String
  }

  # Queries disponibles (lectura)
  type Query {
    products: [Product!]!      # Lista de todos los productos
    product(id: ID!): Product  # Un solo producto por ID
  }

  # Mutaciones disponibles (escritura)
  type Mutation {
    addProduct(
      name: String!
      description: String
      price: Float!
      image: String
    ): Product

    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      image: String
    ): Product

    deleteProduct(id: ID!): Boolean

    # 👇 Mutación nueva para login
    login(email: String!, password: String!): String

    # 👇 Mutación nueva para registro
    register(email: String!, password: String!, role: String!): String
  }
`;
