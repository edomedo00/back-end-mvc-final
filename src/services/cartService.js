const firebase = require('../config/firebase');
const cartCollection = firebase.firestore().collection("carts");

async function ensureCartExists(userId) {
  const cartRef = cartCollection.doc(userId);
  const cartDoc = await cartRef.get();

  if (!cartDoc.exists) {
    console.log(`Cart does not exist for user ${userId}, creating one.`);
    await cartRef.set({
      items: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } else {
    console.log(`Cart already exists for user ${userId}.`);
  }
}

exports.addItemToCart = async (userId, productId, quantity) => {
  try {
    await ensureCartExists(userId); // Ensure the cart exists before adding an item
    const cartRef = cartCollection.doc(userId);
    const cartDoc = await cartRef.get();
    const cartData = cartDoc.data();
    const itemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cartData.items[itemIndex].quantity += quantity;
    } else {
      cartData.items.push({ productId, quantity });
    }

    cartData.updatedAt = new Date();
    await cartRef.update(cartData);

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
      return { success: true, cart: cartDoc.data() };
    }

    return { success: false, message: 'Cart not found' };
  } catch (error) {
    return { success: false, error: error.message };
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

exports.ensureCartExists = ensureCartExists;
