const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: String,
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
  })
);

module.exports = Cart;