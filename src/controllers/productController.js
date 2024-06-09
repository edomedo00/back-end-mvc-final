const productService = require('../services/productServices');

const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getProductById(productId);

    if (result.success) {
      res.status(200).json(result.product);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getProduct };
