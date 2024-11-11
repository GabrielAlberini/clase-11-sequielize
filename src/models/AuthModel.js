import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import { randomUUID } from "node:crypto"
import { sequelize } from '../config/mysqlConnection.js';
import jwt from "jsonwebtoken"

// Definición del modelo de Usuario
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false, // Desactiva createdAt y updatedAt si no los necesitas
});

// Función de registro de usuario
const register = async ({ username, password, email }) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return null;

  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, salt);

  return await User.create({ id: randomUUID(), username, password: hashedPass, email });
};

const login = async ({ username, password }) => {
  const existingUser = await User.findOne({ where: { username } });
  if (!existingUser) return null;

  const isMatch = await bcryptjs.compare(password, existingUser.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: existingUser.id, username: existingUser.username },
    process.env.JWT_SECRET, // Se recomienda almacenar la clave secreta en una variable de entorno
    { expiresIn: '1h' } // El token expirará en 1 hora
  );

  return { user: existingUser, token }; // Devuelve el usuario y el token
};

export default { User, register, login };
