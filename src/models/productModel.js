const firebase = require('../config/firebase')
const productsCollection = firebase.firestore().collection("products")

exports.findProductById = async (productId) => {
  try {
      const productDoc = await productsCollection.doc(productId).get();
      if (productDoc.exists) {
          return { success: true, product: productDoc.data() };
      } else {
          return { success: false, message: 'Product not found' };
      }
  } catch (error) {
      return { success: false, error: error.message };
  }
};

exports.addProduct = async (productData) => {
  try {
    await firestore.collection('products').add(productData);
    return { success: true };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, message: 'Error adding product' };
  }
};

