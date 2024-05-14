const mongoose = require('mongoose')
const Schema = mongoose.Schema


const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true
    },
    supplierContact: {
        type: String,
        required: true
    },
    supplierEmail: {
        type: String,
        required: true,
        unique: true,
        // Validate email format using a regular expression
        validate: {
            validator: function(value) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    supplierCompany :{
        type: String,
        required: true
    },
    itemName :{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Supplier', supplierSchema)