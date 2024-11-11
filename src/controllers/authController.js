import User from '../models/AuthModel.js';

// Controlador de registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await User.register({ username, password, email });
    if (!newUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador de inicio de sesión de usuario
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
