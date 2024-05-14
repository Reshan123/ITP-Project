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
    const { itemPrice, itemStockCount, currentStock, itemDescription, itemImageURL, supplierID } = req.body

    // add doc to the db 
    try {
        const inventoryitems = await inventoryItem.create({ itemPrice, itemStockCount, currentStock, itemDescription, itemImageURL, supplierID })
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

const updateItemStockCount = async (req, res) => {
    const { id } = req.params

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('No such item in the inventory')
        }
    
        const item = await inventoryItem.findById(id)
    
        if (!item){
            throw Error('No such item in the inventory')
        }
    
        if (item.currentStock < req.body.orderQuantity){
            throw Error('Can not place order! Invalid Order Quantity')
        }

        // console.log( req.body)
    
        const inventoryitems = await inventoryItem.findOneAndUpdate({ _id: id }, {
            currentStock: parseInt(item.currentStock) - parseInt(req.body.orderQuantity)
        })
    
        return res.status(200).json({inventoryitems})
    } catch (error){
        return res.status(404).json({ error: error.message })
    }
}



module.exports = {
    getInventoryItems,
    getInventoryItem,
    addNewItem,
    deleteItem,
    updateItem,
    updateItemStockCount
}