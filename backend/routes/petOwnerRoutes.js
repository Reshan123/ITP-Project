const express = require('express')
const {authorize} = require('../middlewear/validateToken')
//controller imports
const petOwnerController = require('../controllers/petOwnerController')

//router
const petOwnerRouter = express.Router()

//routes
petOwnerRouter.post('/login', petOwnerController.login)

petOwnerRouter.post('/signin', petOwnerController.signin)

petOwnerRouter.put('/updateUserDetailsFromToken', authorize, petOwnerController.updateUserDetailsFromToken)

petOwnerRouter.delete('/deleteUserDetailsFromToken', authorize, petOwnerController.deleteUserDetailsFromToken)

petOwnerRouter.get('/getAllUsers', petOwnerController.getAllUsers)

petOwnerRouter.get('/verifyToken', authorize,  petOwnerController.verifyToken)

petOwnerRouter.delete('/deleteUserFromUserID/:userID',  petOwnerController.deleteUserFromUserID)

module.exports = petOwnerRouter