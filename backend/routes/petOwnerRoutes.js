const express = require('express')
const authorize = require('../middlewear/validateToken')
//controller imports
const petOwnerController = require('../controllers/petOwnerController')

//router
const petOwnerRouter = express.Router()

//routes
petOwnerRouter.post('/login', petOwnerController.login)

petOwnerRouter.post('/signin', petOwnerController.signin)

petOwnerRouter.get('/getUserDetailsFromToken', authorize, petOwnerController.getUserDetailsFromToken)

petOwnerRouter.put('/updateUserDetailsFromToken', authorize, petOwnerController.updateUserDetailsFromToken)

petOwnerRouter.delete('/deleteUserDetailsFromToken', authorize, petOwnerController.deleteUserDetailsFromToken)

module.exports = petOwnerRouter