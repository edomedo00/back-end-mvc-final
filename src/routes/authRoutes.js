const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const cartController = require('../controllers/cartController');

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/add', cartController.addItemToCart);
router.post('/remove', cartController.removeItemFromCart);
router.post('/update', cartController.updateItemQuantity);
router.get('/:userId', cartController.getCart);

module.exports = router