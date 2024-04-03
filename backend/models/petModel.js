const mongoose = require('mongoose')


const Schema = mongoose.Schema

const petSchema = new Schema({
    ownerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'petOwner',
        required: true
    },
    petName:{
        type: String,
        required: true,
    },
    petAge:{
        type: Number,
        required: true
    },
    petSpecies:{
        type: String,
        required: true
    },
    petGender:{
        type: String,
        required: true
    },
    petBreed:{
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('pet', petSchema)