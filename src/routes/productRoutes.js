const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productMiddleware = require('../middleware/productMiddleware'); 

router.get('/:productId', productMiddleware.getProductDetails, productController.getProductDetails);

module.exports = router;
