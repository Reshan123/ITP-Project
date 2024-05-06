const mongoose = require('mongoose')

const schema = mongoose.Schema

const salesItemSchema = new schema({
    itemName: {
        type: String,
        required: true
      },

      itemPrice: {
        type: Number,
        required: true
      },

      itemQuantity: {
        type: Number,
        required: true
      },

      totalPurchase: {
        type: Number,
        required: true
      }

}, {timeStamp: true})

module.exports = mongoose.model('salesItem',salesItemSchema)

