const express = require('express')
const {authorize} = require('../middlewear/validateToken')
const { getAllPets, getSinglePet, getOneOwnerPets, createPet, adminCreatePet, deletePetFromID, updatePetFromID } = require('../controllers/petController')

const petRouter = express.Router()

petRouter.get("/getAllPets", getAllPets)
petRouter.get("/getSinglePet/:id", getSinglePet)
petRouter.get("/getOneOwnerPets", authorize, getOneOwnerPets)

petRouter.post("/createPet", authorize, createPet)
petRouter.post("/adminCreatePet", adminCreatePet)

petRouter.delete("/deletePetFromID/:petID", deletePetFromID)
petRouter.put("/updatePetFromID/:petID", updatePetFromID)

module.exports = petRouter