const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({

    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    owner_name: { 
        type: String, 
        required: true 
    },

    owner_email: { 
        type: String, 
        required: true 
    },

    owner_contact: { 
        type: String, 
        required: true 
    },

    pet_name:{
        type: String, 
        required: true 
    },

    pet_species:{
        type: String, 
        required: true 
    },

    pet_breed:{
        type: String
    },

    doctor: { 
        type: String, // type: mongoose.Schema.Types.ObjectId
        required: true 
    },

    start_time: { 
        type: Date, 
        required: true 
    },

    description: { 
        type: String 
    },

    status: { 
        type: String,
        enum: ['pending', 'approved', 'completed', 'cancelled'], 
        default: 'pending' 
    }, 

}, {timestamps: true})

module.exports = mongoose.model('Booking', bookingSchema)