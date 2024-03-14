const petOwner = require('../models/petOwnerModel')
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

        res.status(200).json({username: user.name, userToken: token})

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

        res.status(200).json({username: user.name, userToken: token})

    } catch (error){
        res.status(400).json({msg: error.message})
    }

}

const getUserDetails = async (req, res) => {
    const userID = req.user._id
    try{
        const user = await petOwner.findById(userID)
        if (!user){
            res.status(400).json({msg: "Invalid Token"})
        }

        res.status(200).json({
            username: user.name,
            email: user.email
        })

    } catch (error){
        res.status(400).json({msg: "Invalid Credentials"})
    }
}

module.exports = { login, signin, getUserDetails }