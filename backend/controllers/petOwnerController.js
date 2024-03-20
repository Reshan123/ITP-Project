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
        const user = await petOwner.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username: user.name, email: user.email, userToken: token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const signin = async (req, res) => {

    const {name, email, password} = req.body

    try{
        const user = await petOwner.signup(name, email, password)

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

module.exports = { login, signin, updateUserDetailsFromToken, deleteUserDetailsFromToken }