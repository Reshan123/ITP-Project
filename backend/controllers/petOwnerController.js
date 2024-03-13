const petOwner = require('../models/petOwnerModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, "dhfsdfioshdfoishdoifhsd", { expiresIn: '3d' })
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

module.exports = { login, signin }