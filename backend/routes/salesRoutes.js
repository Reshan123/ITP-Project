const express = require('express')

const{
    getAllSales,
    getSpecificSale,
    updateSale,
    addNewSale,
    deleteSale
} = require('../controllers/salesController')

const router = express.Router()

//Get all sales
router.get('/',getAllSales)

//Get a specific sale
router.get('/id', getSpecificSale)

//Add a new sale
router.post('/',addNewSale)

//Update a sale
router.patch('/:id',updateSale)

//delete a sale
router.delete('/:id',deleteSale)

module.exports = router