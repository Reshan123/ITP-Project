const express = require('express')

//controller imports
const { login, signin } = require('../controllers/petOwnerController')

//router
const petOwnerRouter = express.Router()

//routes
petOwnerRouter.post('/login', login)

petOwnerRouter.post('/signin', signin)


module.exports = petOwnerRouter