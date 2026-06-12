import bcrypt from 'bcrypt';
import {User} from "../models/user.js"
import { generateToken } from "../utils/generateToken.js";

export const registerUserService = async ({name, email, password}) => {

    if (!name || !email || !password) {
    throw new Error("Campos obligatorios faltantes");
  }

  // verificar usuario existente
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // crear usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };

};

export const loginUserService = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Email y password son obligatorios");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

