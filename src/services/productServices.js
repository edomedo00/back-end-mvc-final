const firebase = require('../config/firebase'); 
const productsCollection = firebase.firestore().collection("products");

const getProductById = async (productId) => {
  try {
    const productDoc = await productsCollection.doc(productId).get(); 

    if (productDoc.exists) {
      const productData = productDoc.data(); 
      return { success: true, product: productData }; 
    } else {
      return { success: false, message: 'Product not found' }; 
    }
  } catch (error) {
    return { success: false, error: error.message }; 
  }
};

module.exports = { getProductById };
