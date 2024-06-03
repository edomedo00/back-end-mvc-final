const { addItemToCart, removeItemFromCart, updateItemQuantity, getCart, clearCart } = require('../models/cartModel');
const { findProductById } = require('../models/productModel'); 

exports.addItemToCart = async (userId, productId, quantity) => {
  try {
    const product = await findProductById(productId);
    if (!product) {
      return {
        success: false,
        message: 'Product not found'
      };
    }

    const result = await addItemToCart(userId, productId, quantity);
    if (result.success) {
      return {
        success: true
      };
    }

    return {
      success: false,
      message: 'Error adding item to cart'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

exports.removeItemFromCart = async (userId, productId) => {
  try {
    const result = await removeItemFromCart(userId, productId);
    if (result.success) {
      return {
        success: true
      };
    }

    return {
      success: false,
      message: 'Error removing item from cart'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

exports.updateItemQuantity = async (userId, productId, quantity) => {
  try {
    const result = await updateItemQuantity(userId, productId, quantity);
    if (result.success) {
      return {
        success: true
      };
    }

    return {
      success: false,
      message: 'Error updating item quantity'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

exports.getCart = async (userId) => {
  try {
    const cart = await getCart(userId);
    if (cart) {
      return {
        success: true,
        cart
      };
    }

    return {
      success: false,
      message: 'Cart not found'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

exports.clearCart = async (userId) => {
  try {
    const result = await clearCart(userId);
    if (result.success) {
      return {
        success: true
      };
    }

    return {
      success: false,
      message: 'Error clearing cart'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
