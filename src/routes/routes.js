const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');
const productController = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/cart/add', authMiddleware, cartController.addItemToCart);
router.post('/cart/remove', authMiddleware, cartController.removeItemFromCart);
router.post('/cart/update', authMiddleware, cartController.updateItemQuantity);
router.get('/cart', authMiddleware, cartController.getCart);

router.get('/product/:productId', productController.getProduct);

module.exports = router;
