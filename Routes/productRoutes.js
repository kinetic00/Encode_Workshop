const express = require('express');

const router = express.Router()

const {
    getAllProduct,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../Controllers/productControllers')

router.get('/products', getAllProduct)

router.get('/product/:id', getProduct)

router.post('/product', addProduct)

router.patch('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)

module.exports = router; 