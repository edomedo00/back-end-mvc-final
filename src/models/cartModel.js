const firebase = require('../config/firebase')
const cartCollection = firebase.firestore().collection("carts")

exports.addItemToCart = async (userId, productId, quantity) => {
  try {
    const cartRef = cartCollection.doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      await cartRef.set({
        items: [{ productId, quantity }],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      const cartData = cartDoc.data();
      const itemIndex = cartData.items.findIndex(item => item.productId === productId);

      if (itemIndex > -1) {
        cartData.items[itemIndex].quantity += quantity;
      } else {
        cartData.items.push({ productId, quantity });
      }

      cartData.updatedAt = new Date();
      await cartRef.update(cartData);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.removeItemFromCart = async (userId, productId) => {
  try {
    const cartRef = cartCollection.doc(userId);
    const cartDoc = await cartRef.get();

    if (cartDoc.exists) {
      const cartData = cartDoc.data();
      cartData.items = cartData.items.filter(item => item.productId !== productId);
      cartData.updatedAt = new Date();
      await cartRef.update(cartData);

      return { success: true };
    }

    return { success: false, message: 'Cart not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.updateItemQuantity = async (userId, productId, quantity) => {
  try {
    const cartRef = cartCollection.doc(userId);
    const cartDoc = await cartRef.get();

    if (cartDoc.exists) {
      const cartData = cartDoc.data();
      const itemIndex = cartData.items.findIndex(item => item.productId === productId);

      if (itemIndex > -1) {
        cartData.items[itemIndex].quantity = quantity;
        cartData.updatedAt = new Date();
        await cartRef.update(cartData);

        return { success: true };
      }

      return { success: false, message: 'Product not found in cart' };
    }

    return { success: false, message: 'Cart not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.getCart = async (userId) => {
  try {
    const cartRef = cartCollection.doc(userId);
    const cartDoc = await cartRef.get();

    if (cartDoc.exists) {
      return cartDoc.data();
    }

    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.clearCart = async (userId) => {
  try {
    const cartRef = cartCollection.doc(userId);
    await cartRef.update({ items: [], updatedAt: new Date() });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
