const firebase = require('../config/firebase'); 
const productsCollection = firebase.firestore().collection("products"); 

const getProductDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId; 

        const productDoc = await productsCollection.doc(productId).get();
        
        if (productDoc.exists) {
            req.productDetails = productDoc.data();
            next(); 
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { getProductDetails }; 
