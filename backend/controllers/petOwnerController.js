const petOwner = require('../models/petOwnerModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET , { expiresIn: '3d' })
}

const login = async (req, res) => {
    
    const {email, password} = req.body

    try {
        if (!email || !password) {
            throw Error('All fields must be filled')
        }
    
        const user = await petOwner.findOne({ email })
        if (!user) {
            throw Error('Incorrect email')
        }
    
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error('Incorrect password')
        }

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.name, email: user.email, userToken: token,uid:user._id})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const signin = async (req, res) => {

    const {name, email, password} = req.body

    try{
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
        
          const exists = await petOwner.findOne({ email })
        
          if (exists) {
            throw Error('Email already in use')
          }
        
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(password, salt)
        
          const user = await petOwner.create({ name, email, password: hash })

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.name, email: user.email, userToken: token})

    } catch (error){
        res.status(400).json({message: error.message})
    }

}

const updateUserDetailsFromToken = async (req, res) => {
    const {name, email, password} = req.body;
    const userID = req.user._id

    try{
        if (!name || !email) {
            throw Error('Name and Email fields must be filled')
        }
        if(!validator.isAlpha(name, ['en-US'], {ignore: '-s'})){
            throw Error('Name can only have letters')
        }
        if (!validator.isEmail(email)) {
          throw Error('Email not valid')
        }
        if (password) {
            if (!validator.isStrongPassword(password)) {
                throw Error('Password not strong enough')
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const response = await petOwner.findByIdAndUpdate(userID, {
                name,
                email,
                password: hash
            })

            res.status(200).json({username: response.name, email: response.email})
            return
        } else {
            const response = await petOwner.findByIdAndUpdate(userID, {
                name,
                email
            })

            console.log(response)
            
            res.status(200).json({username: response.name, email: response.email})
        }
        

    } catch (error){
        res.status(400).json({message: error.message})
    }

}
const deleteUserDetailsFromToken = async (req, res) => {
    const userID = req.user._id
    try{
        const userExist = await petOwner.findById(userID)
        if (!userExist){
            throw Error("User doesnt exist")
        }

        const response = await petOwner.findByIdAndDelete(userID)
        
        res.status(200).json({message: "User removed"})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try{
        const response = await petOwner.find()
        if (!response){
            throw Error("Couldnt Fetch Data")
        }
        res.status(200).json(response)
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const verifyToken = async (req, res) => {
    const userID = req.user._id
    
    try{
        if (!userID){
            throw Error("Invalid Token")
        }

        const response = await petOwner.findById(userID)

        if(!response){
            throw Error("Inavlid User")
        }

        res.status(200).json({message: "VALID USER"})

    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { login, signin, updateUserDetailsFromToken, deleteUserDetailsFromToken, getAllUsers, verifyToken }