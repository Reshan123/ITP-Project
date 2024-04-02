const inventoryItem = require('../models/inventoryModel')
const mongoose = require('mongoose')

//get all iventory items
const getInventoryItems = async (req, res) => {
    const inventoryitems = await inventoryItem.find({}).sort({ createdAt: -1 })

    res.status(200).json(inventoryitems)
}


//get a single inventory itemw
const getInventoryItem = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item in the inventory' })

    }
    const inventoryitems = await inventoryItem.findById(id)

    if (!inventoryitems) {
        return res.status(404).json({ error: 'No such item in the inventory' })
    }

    res.status(200).json(inventoryitems)
}


//add new item
const addNewItem = async (req, res) => {
    const { itemName, itemPrice, itemStockCount, currentStock, itemDescription, itemImageURL } = req.body

    // add doc to the db 
    try {
        const inventoryitems = await inventoryItem.create({ itemName, itemPrice, itemStockCount, currentStock, itemDescription, itemImageURL })
        res.status(200).json(inventoryitems)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



//delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item in the inventory' })

    }

    const inventoryitems = await inventoryItem.findOneAndDelete({ _id: id })

    if (!inventoryitems) {
        return res.status(404).json({ error: 'No such item in the inventory' })
    }

    res.status(200).json(inventoryitems)

}


//update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item in the inventory' })

    }

    const inventoryitems = await inventoryItem.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!inventoryitems) {
        return res.status(404).json({ error: 'No such item in the inventory' })
    }

    res.status(200).json(inventoryitems)

}



module.exports = {
    getInventoryItems,
    getInventoryItem,
    addNewItem,
    deleteItem,
    updateItem
}