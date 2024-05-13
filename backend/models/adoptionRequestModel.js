const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adoptionRequestSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // petOwnerID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    petName: {
        type: String,
        required: true
    },
    adoptionFormID: {
        type: String,
        required: true
    },

    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    residenceType: {
        type: String,
        enum: ['House', 'Apartment', 'Other'],
        required: true
    },
    residenceDetails: {
        type: String
    },

    currentPets: {
        type: Boolean,
        required: true
    },
    currentPetsDetails: {
        type: String
    },
    reasonForAdoption: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
})

const adoptionRequestForm = mongoose.model("adoptionRequestForm", adoptionRequestSchema)

module.exports = adoptionRequestForm