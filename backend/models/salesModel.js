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

      quantity: {
        type: Number,
        required: true
      },

      status: {
        type: String,
        required: true
      }

}, {timestamps: true})

module.exports = mongoose.model('salesItem',salesItemSchema)

