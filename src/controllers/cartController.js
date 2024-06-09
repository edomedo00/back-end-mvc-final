const cartService = require('../services/cartService');
const jwt = require('jsonwebtoken')

async function addItemToCart(req, res) {
  const { productId, quantity } = req.body;

  const token = req.headers.authorization;
  const userId = getUserId(token);

  try {
    const response = await cartService.addItemToCart(userId, productId, quantity);
    if (response.success) {
      res.status(200).json({ message: 'Item added to cart successfully' });
    } else {
      res.status(400).json({ message: response.message || 'Error adding item to cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeItemFromCart(req, res) {
  const { userId, productId } = req.body;
  try {
    const response = await cartService.removeItemFromCart(userId, productId);
    if (response.success) {
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } else {
      res.status(400).json({ message: response.message || 'Error removing item from cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateItemQuantity(req, res) {
  const { userId, productId, quantity } = req.body;
  try {
    const response = await cartService.updateItemQuantity(userId, productId, quantity);
    if (response.success) {
      res.status(200).json({ message: 'Item quantity updated successfully' });
    } else {
      res.status(400).json({ message: response.message || 'Error updating item quantity' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCart(req, res) {

  const token = req.headers.authorization;
  const userId = getUserId(token);
  
  try {
    const response = await cartService.getCart(userId);
    if (response.success) {
      res.status(200).json({ cart: response.cart });
    } else {
      res.status(400).json({ message: response.message || 'Error fetching cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function getUserId(token) {
  const tokenParts = token.split(' ');
  const tokenValue = tokenParts[1];

  const decoded = jwt.verify(tokenValue, process.env.TOP_SECRET);
  return decoded.userId;
}

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCart,
};
