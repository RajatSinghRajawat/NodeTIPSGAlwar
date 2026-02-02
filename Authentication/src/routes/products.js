const express = require('express');
const router = express.Router();
const { addPrdoucts, getproducts, getOne, searchProducts } = require('../controller/products');

router.post('/add', addPrdoucts);
router.get('/all', getproducts);
router.get('/search', searchProducts);
router.get('/:id', getOne);


module.exports = router;