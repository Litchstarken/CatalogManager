import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Este archivo crea una conexión a la base de datos SQLite usando el paquete `sqlite`

// Exportamos una promesa de base de datos para poder usar async/await
export const db = open({
  filename: './products.db',  // Archivo físico de la base de datos
  driver: sqlite3.Database
}).then(async (db) => {
  // Creamos la tabla `products` si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  return db;
});

