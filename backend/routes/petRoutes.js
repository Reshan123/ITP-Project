const express = require('express')
const {authorize} = require('../middlewear/validateToken')
const { getAllPets, getSinglePet, getOneOwnerPets, createPet, adminCreatePet, deletePetFromID, updatePetFromID } = require('../controllers/petController')

const petRouter = express.Router()

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/PetImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + Math.floor(Math.random() * 1000000) + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

petRouter.get("/getAllPets", getAllPets)
petRouter.get("/getSinglePet/:id", getSinglePet)
petRouter.get("/getOneOwnerPets", authorize, getOneOwnerPets)

petRouter.post("/createPet", authorize, upload.array('petImage', 5), createPet)
petRouter.post("/adminCreatePet", upload.array('petImage', 5), adminCreatePet)

petRouter.delete("/deletePetFromID/:petID", deletePetFromID)
petRouter.put("/updatePetFromID/:petID", upload.array('petImage', 5), updatePetFromID)

module.exports = petRouter