const firebase = require('firebase-admin');

const serviceAccount = require('../config/serviceAccountsKey.json'); 

exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId; 
    const productRef = firebase.firestore().collection('products').doc(productId);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const productData = productDoc.data();
    return res.status(200).json(productData);
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
