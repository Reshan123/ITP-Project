const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
  // itemName: {
  //   type: String,
  //   required: true
  // },
  supplierID: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
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
    required: false
  },
  itemDescription: {
    type: String,
    required: true
  },
  itemImageURL: {
    type: String,
    required: false
  }

}, { timestamps: true })

module.exports = mongoose.model('inventoryItem', inventorySchema)