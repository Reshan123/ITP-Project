const express = require('express')
const {
    createSupplier,
    getSupplier,
    getallSupplier,
    deleteSupplier,
    updateSupplier
} = require('../controllers/supplierController')

const router = express.Router()

//get all workouts
router.get('/', getallSupplier)

//get single workout
router.get('/:id', getSupplier)

//post a new workout 
router.post('/', createSupplier)

//delete workout
router.delete('/:id', deleteSupplier)

//update workout
router.patch('/:id', updateSupplier)


module.exports = router