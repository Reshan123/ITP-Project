const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lostNoticeSchema = new Schema({

        owner_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        petName:{
            type: String,
            required: true
        },

        ownerName:{
            type:String,
            minlength:[3,'Name must be atleast 3 letters long'],
            required:true
        },

        breed:{
            type:String,
            required:true
        },

        description:{
            type:String,
            maxlength:[350,'Should not be more than 350 words'],
            required:true
        },

        contactNo:{
            type:String,
            required:true
        },

        image:{
            type:[String],
            required:true,
        },

        email:{
            type:String,
            required:true
        },
    
},{timestamps:true})

module.exports = mongoose.model('LostNoticeInfo',lostNoticeSchema)