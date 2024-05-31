import { firestore } from './firebase'; 

const addItemToCart = async (userId, productId, quantity) => {
  const cartRef = firestore.collection('carts').doc(userId);
  const cartDoc = await cartRef.get();

  if (cartDoc.exists) {
    const cartData = cartDoc.data();
    const itemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cartData.items[itemIndex].quantity += quantity;
    } else {
      cartData.items.push({ productId, quantity });
    }
    cartData.updatedAt = new Date();

    await cartRef.update(cartData);
  } else {
    const newCart = {
      items: [{ productId, quantity }],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await cartRef.set(newCart);
  }
};


const removeItemFromCart = async (userId, productId) => {
  const cartRef = firestore.collection('carts').doc(userId);
  const cartDoc = await cartRef.get();

  if (cartDoc.exists) {
    const cartData = cartDoc.data();
    cartData.items = cartData.items.filter(item => item.productId !== productId);
    cartData.updatedAt = new Date();

    await cartRef.update(cartData);
  }
};

const updateItemQuantity = async (userId, productId, quantity) => {
  const cartRef = firestore.collection('carts').doc(userId);
  const cartDoc = await cartRef.get();

  if (cartDoc.exists) {
    const cartData = cartDoc.data();
    const itemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cartData.items[itemIndex].quantity = quantity;
      cartData.updatedAt = new Date();

      await cartRef.update(cartData);
    }
  }
};
