import Product from "../models/ProductModel.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts(); // Recupera todos los productos con Sequelize
    res.status(200).json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, brand } = req.body;
    const newProduct = await Product.addProduct({ name, price, description, stock }); // Crea un nuevo producto con Sequelize
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "no se puede repetir un producto" });
    }
    console.log(error)
    res.status(500).json({ error: "internal server error" });
  }
};

export { getAllProducts, addProduct };
