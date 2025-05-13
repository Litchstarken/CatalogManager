import { db } from "../db";
import { login as loginFn } from "../auth"; // 👈 Importamos la función login
import { Context } from "../types"; // 👈 Importamos el tipo Context
import bcrypt from "bcrypt";
import { generateToken } from "../auth";

export const resolvers = {
  Query: {
    // Devuelve todos los productos de la base de datos
    products: async () => {
      try {
        const database = await db;
        return database.all("SELECT * FROM products");
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products");
      }
    },

    // Devuelve un producto por su ID
    product: async (_: any, args: { id: string }) => {
      try {
        const database = await db;
        return database.get("SELECT * FROM products WHERE id = ?", args.id);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Error fetching product");
      }
    },
  },

  Mutation: {
    // Crea un nuevo producto
    addProduct: async (
      _: any,
      args: {
        name: string;
        description?: string;
        price: number;
        image?: string;
      },
      context: Context
    ) => {
      try {
        if (!context.user) {
          throw new Error("No autorizado");
        }
        const database = await db;
        const { name, description, price, image } = args;

        // Insertamos el nuevo producto en la base de datos
        const result = await database.run(
          "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
          name,
          description,
          price,
          image
        );

        // Devolvemos el nuevo producto insertado, incluyendo su ID
        return {
          id: result.lastID,
          name,
          description,
          price,
          image,
        };
      } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Error adding product");
      }
    },

    // Actualiza los campos de un producto existente
    updateProduct: async (
      _: any,
      args: {
        id: string;
        name?: string;
        description?: string;
        price?: number;
        image?: string;
      },
      context: Context
    ) => {
      try {
        if (!context.user) {
          throw new Error("No autorizado");
        }
        const database = await db;

        // Obtenemos el producto actual
        const existing = await database.get(
          "SELECT * FROM products WHERE id = ?",
          args.id
        );
        if (!existing) return null;

        // Aplicamos los cambios si se proporcionan
        const updated = {
          ...existing,
          ...args,
        };

        // Ejecutamos la actualización
        await database.run(
          "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?",
          updated.name,
          updated.description,
          updated.price,
          updated.image,
          args.id
        );

        return updated;
      } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Error updating product");
      }
    },

    // Elimina un producto por su ID
    deleteProduct: async (_: any, args: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error("No autorizado");
        }
        const database = await db;
        const result = await database.run(
          "DELETE FROM products WHERE id = ?",
          args.id
        );
        return result.changes && result.changes > 0;
      } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Error deleting product");
      }
    },

    login: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;

      const database = await db;
      const user = await database.get(
        "SELECT * FROM users WHERE email = ?",
        email
      );
      if (!user) throw new Error("Credenciales inválidas");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Credenciales inválidas");

      return generateToken({ id: user.id, email: user.email, role: user.role });
    },

    register: async (
      _: any,
      args: { email: string; password: string; role: string }
    ) => {
      const { email, password, role } = args;

      const database = await db;

      // Verificar si ya existe
      const existingUser = await database.get(
        "SELECT * FROM users WHERE email = ?",
        email
      );
      if (existingUser) throw new Error("El usuario ya existe");

      // Hash de contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar usuario
      await database.run(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        email,
        hashedPassword,
        role
      );

      // Obtener ID insertado y generar token
      const user = await database.get(
        "SELECT * FROM users WHERE email = ?",
        email
      );
      return generateToken({ id: user.id, email: user.email, role: user.role });
    },
  },
};
