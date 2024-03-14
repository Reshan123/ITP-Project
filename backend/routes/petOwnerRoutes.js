const express = require('express')
const authorize = require('../middlewear/validateToken')
//controller imports
const { login, signin, getUserDetails } = require('../controllers/petOwnerController')

//router
const petOwnerRouter = express.Router()

//routes
petOwnerRouter.post('/login', login)

petOwnerRouter.post('/signin', signin)

petOwnerRouter.get('/getUserDetails', authorize, getUserDetails)


module.exports = petOwnerRouter