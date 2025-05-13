import jwt from 'jsonwebtoken';
import { Request } from 'express';

// 🔐 Clave secreta para firmar/verificar tokens (en prod debería venir de process.env)
const SECRET_KEY = 'mi_super_clave_secreta';

// 🎟️ Usuario de prueba (en un sistema real esto vendría de una base de datos)
const testUser = {
  id: 1,
  email: 'cliente@ejemplo.com',
  password: '123456', // en producción esto se guarda hasheado
  role: 'admin',
};

// 🧾 Genera un token JWT para un usuario
export function generateToken(user: { id: number; email: string, role: string }) {
  // En un sistema real, el token debería incluir más información y ser firmado con una clave secreta
  // que no se exponga en el código fuente.
  // También se recomienda usar un algoritmo de firma más seguro (HS256, RS256, etc.)
  // y almacenar la clave secreta en un entorno seguro (como variables de entorno).
  // En este caso, usamos HS256 como algoritmo de firma.
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
}

// ✅ Verifica el token y retorna el payload si es válido
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

// 🧠 Extrae el token del header de autorización del request HTTP
export function getUserFromRequest(req: Request) {
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    return decoded;
  }

  return null;
}

// 🔐 Verifica email/contraseña y retorna un token si es válido
export function login(email: string, password: string): string | null {
  if (email === testUser.email && password === testUser.password) {
    return generateToken({ id: testUser.id, email: testUser.email, role: testUser.role });
  }
  return null;
}
