const db = require("../models");
const Product = db.product;

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.error('Error getting products', error);
        res.status(500).json({ message: 'An error occurred' });
      }
  };
  
exports.addProduct = async (req, res) => {
const product = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image
    });

    product.save(err => {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }
    res.send({ message: "Product added successfully!" });
    });
};

