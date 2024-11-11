import { Sequelize } from "sequelize";
process.loadEnvFile()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos con Sequelize.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};

export { sequelize, connectDb };
