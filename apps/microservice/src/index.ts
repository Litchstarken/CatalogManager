import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { db } from './db'; // Importamos la conexión a la base de datos
import { getUserFromRequest } from './auth'; // Importamos la función para obtener el usuario del request

const app = express();

// Creamos una instancia del servidor Apollo con schema y resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // 👇 Inyectamos el usuario autenticado (si hay token válido)
    const user = getUserFromRequest(req);
    return { user };
  },
});

async function startServer() {
  await server.start(); // iniciamos Apollo Server
  server.applyMiddleware({ app }); // conectamos Apollo con Express

  // Express escucha en el puerto 4000
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
