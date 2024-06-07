const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');
const productController = require('../controllers/productController'); 
const productMiddleware = require('../middleware/productMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/add', authMiddleware, cartController.addItemToCart);
router.post('/remove', authMiddleware, cartController.removeItemFromCart);
router.post('/update', authMiddleware, cartController.updateItemQuantity);
router.get('/:userId', authMiddleware, cartController.getCart);

router.get('/product/:productId', productMiddleware.getProductDetails, productController.getProductDetails);

module.exports = router;
