const express = require('express');

// Created Require Files..
const controller = require('../controller/search');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/search/
 * http://localhost:3000/api/search
 */

 router.post('/get-product-from-aliexpress', controller.getProductFromAliexpress);
 router.post('/get-product-from-amazon', controller.getProductFromAmazon);
 router.post('/post-order', controller.postOrder);
 router.get('/get-all-orders', controller.getAllOrders);


 // Export All router..
module.exports = router;





