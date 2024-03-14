const express = require('express')
const {
    getInventoryItems,
    getInventoryItem,
    addNewItem,
    deleteItem,
    updateItem
}= require('../controllers/inventoryControllers')

const router = express.Router()

// GET all items
router.get('/', getInventoryItems)

// GET a single item
router.get('/:id',getInventoryItem)

// POST a new item
router.post('/',addNewItem )

// DELETE an item
router.delete('/:id', deleteItem)

// UPDATE an item
router.patch('/:id', updateItem)

module.exports = router