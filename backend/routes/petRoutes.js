const express = require('express')
const {authorize} = require('../middlewear/validateToken')
const { getAllPets, getSinglePet, getOneOwnerPets, createPet, adminCreatePet } = require('../controllers/petController')

const petRouter = express.Router()

petRouter.get("/getAllPets", getAllPets)
petRouter.get("/getSinglePet/:id", getSinglePet)
petRouter.get("/getOneOwnerPets", authorize, getOneOwnerPets)

petRouter.post("/createPet", authorize, createPet)
petRouter.post("/adminCreatePet", adminCreatePet)

module.exports = petRouter