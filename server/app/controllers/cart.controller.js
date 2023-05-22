const db = require("../models");
const Product = db.product;
const Cart = db.cart;

exports.getCartDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
      } catch (error) {
        console.error('Error getting cart by user ID', error);
        res.status(500).json({ message: 'An error occurred' });
      }
  };
  
exports.addToCart = async (req, res) => {
try {
    const { userId, productId, quantity } = req.body;
console.log(req.body)
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user's cart exists
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        // Create a new cart if it doesn't exist
        cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const cartItem = cart.items.find((item) => item.productId.equals(productId));
    if (cartItem) {
        // Update the quantity if the product is already in the cart
        cartItem.quantity += quantity;
    } else {
        // Add a new item to the cart
        cart.items.push({ productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.json(cart);
    } catch (error) {
    console.error('Error adding product to cart', error);
    res.status(500).json({ message: 'An error occurred' });
    }
};

exports.updateCartDetails = async (req, res) => {
    try {
        const { userId } = req.body;
        const itemId = req.params.itemId;
        const quantity = req.body.quantity;
    
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        // Find the item in the cart
        const item = cart.items.find((item) => item.productId.equals(itemId));
        if (!item) {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
        // Update the quantity of the item
        item.quantity = quantity;
    
        // Save the cart
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Error updating item in cart', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const itemId = req.params.itemId;
    
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');;
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.equals(itemId));
        if (itemIndex === -1) {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
    
        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);
    
        // Save the cart
        await cart.save();
        res.json(cart);
      } catch (error) {
        console.error('Error deleting item from cart', error);
        res.status(500).json({ message: 'An error occurred' });
      }
};