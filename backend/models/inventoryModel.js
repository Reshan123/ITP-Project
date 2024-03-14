const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemStockCount: {
    type: Number,
    required: true
  },
  currentStock:{
    type:Number,
    required: true
  },
  itemDescription: {
    type: String,
    required: true
  },
  itemImageURL: {
    type: String,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model('inventoryItem', inventorySchema)