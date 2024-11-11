import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysqlConnection.js";

const Product = sequelize.define("productos", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre del producto es obligatorio" },
      len: { args: [3, 100], msg: "El nombre debe tener entre 3 y 100 caracteres" }
    },
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      len: { args: [0, 500], msg: "La descripción no puede exceder los 500 caracteres" }
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "El precio no puede ser menor a 0"
      },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "El stock no puede ser menor a 0"
      },
      isInt: {
        msg: "El stock debe ser un número entero"
      }
    },
  },
}, {
  timestamps: false,
});

const getAllProducts = () => {
  return Product.findAll();
};

const addProduct = (productData) => {
  console.log(productData)
  return Product.create(productData);
};

export default { Product, getAllProducts, addProduct };
