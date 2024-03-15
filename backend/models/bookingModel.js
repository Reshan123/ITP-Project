const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({

    pet: { 
        type: String, 
        required: true 
    },

    owner: { 
        type: String, 
        required: true 
    }, 

    doctor: { 
        type: String, // type: mongoose.Schema.Types.ObjectId
        ref: 'Doctor', required: true 
    },

    start_time: { 
        type: Date, 
        required: true 
    },

    description: { 
        type: String 
    },

    status: { 
        type: String, enum: ['pending', 'confirmed', 'completed'], 
        default: 'pending' 
    }, 

}, {timestamps: true})

module.exports = mongoose.model('Booking', bookingSchema)