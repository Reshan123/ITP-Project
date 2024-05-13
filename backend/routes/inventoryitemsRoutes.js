const express = require('express')
const {
    getInventoryItems,
    getInventoryItem,
    addNewItem,
    deleteItem,
    updateItem,
    updateItemStockCount
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
router.put('/:id', updateItem)

router.put('/updateStockCount/:id', updateItemStockCount)

module.exports = router