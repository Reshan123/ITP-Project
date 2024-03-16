const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const petOwnerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})



// static signup method
petOwnerSchema.statics.signup = async function(name, email, password) {

    // validation
    if (!email || !password || !name) {
      throw Error('All fields must be filled')
    }
    if(!validator.isAlpha(name, ['en-US'], {ignore: '-s'})){
        throw Error('Name can only have letters')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ name, email, password: hash })
  
    return user
}

petOwnerSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
}


module.exports = mongoose.model('petOwner', petOwnerSchema)