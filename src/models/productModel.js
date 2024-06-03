const firebase = require('../config/firebase')
const productsCollection = firebase.firestore().collection("products")

exports.findProductById = async (productId) => {
  try {
    const product = productsCollection.find(p => p.productId === productId);
    if (product) {
      return { success: true, product };
    }
    return { success: false, message: 'Product not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
