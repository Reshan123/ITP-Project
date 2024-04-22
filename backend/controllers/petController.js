const validator = require('validator')
let mongoose = require('mongoose');
const pet = require('../models/petModel')


const createPet = async (req, res) => {
    const userID = req.user._id
    const {petName,petAge,petSpecies,petGender,petBreed} = req.body

    try{
        const { files } = req;
        const filenames = files.map(file => (file.filename))
        if (!petName || !petAge || !petSpecies || !petGender || !petBreed) {
            throw Error('All fields must be filled')
        }
        if(!validator.isAlpha(petName, ['en-US'], {ignore: '-s'})){
            throw Error('Pet name can only have letters')
        }
        if(!validator.isAlpha(petSpecies, ['en-US'], {ignore: '-s'})){
            throw Error('pet species can only have letters')
        }
        if(!validator.isAlpha(petGender, ['en-US'], {ignore: '-s'})){
            throw Error('Pet gender can only have letters')
        }
        if(!validator.isAlpha(petBreed, ['en-US'], {ignore: '-s'})){
            throw Error('Pet breed can only have letters')
        }


        const petResponse = await pet.create({ownerID: userID,petName,petAge,petSpecies,petGender,petBreed,petImage:[...filenames]})

        res.status(200).json({message: petResponse})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const adminCreatePet = async (req, res) => {
    const {ownerID, petName,petAge,petSpecies,petGender,petBreed} = req.body

    
    try{
        const { files } = req;
        const filenames = files.map(file => (file.filename))
        // let ownerID = mongoose.Types.ObjectId(userID);

        if (!ownerID || !petName || !petAge || !petSpecies || !petGender || !petBreed) {
            throw Error('All fields must be filled')
        }
        if(!validator.isAlpha(petName, ['en-US'], {ignore: '-s'})){
            throw Error('Pet name can only have letters')
        }
        if(!validator.isAlpha(petSpecies, ['en-US'], {ignore: '-s'})){
            throw Error('pet species can only have letters')
        }
        if(!validator.isAlpha(petGender, ['en-US'], {ignore: '-s'})){
            throw Error('Pet gender can only have letters')
        }
        if(!validator.isAlpha(petBreed, ['en-US'], {ignore: '-s'})){
            throw Error('Pet breed can only have letters')
        }


        const petResponse = await pet.create({ownerID, petName,petAge,petSpecies,petGender,petBreed,petImage:[...filenames]})

        res.status(200).json({message: petResponse})
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const getAllPets = async (req, res) => {
    
    try{
        const allPets = await pet.find()

        res.status(200).json({message: allPets})

    } catch (error){
        res.status(400).json({message: error.message})
    }

}

const getSinglePet = async (req, res) => {
    const { id } = req.params
    try{
        const petDetails = await pet.findById(id)

        res.status(200).json({message: petDetails})

    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const getOneOwnerPets = async (req, res) => {
    const userID = req.user._id
    try{
        if (!userID){
            throw Error("Invalid User ID")
        }

        const allPets = await pet.find({ownerID: userID})

        res.status(200).json({message: allPets})

    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const deletePetFromID = async (req, res) => {
    const { petID } = req.params

    try{
        const petExist = await pet.findById(petID)
        if(!petExist){
            throw Error("Invalid ID")
        }

        const response = await pet.findByIdAndDelete(petID)
        res.status(200).json({message: "Pet Deleted"})

    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const updatePetFromID = async (req, res) => {
    const { petID } = req.params
    const {ownerID, petName,petAge,petSpecies,petGender,petBreed} = req.body
    const options = {
        new: true
    }
    
    try{
        const { files } = req;
        const filenames = files.map(file => (file.filename))
        const petExist = await pet.findById(petID)
        if(!petExist){
            throw Error("Invalid ID")
        }

        if (!ownerID || !petName || !petAge || !petSpecies || !petGender || !petBreed) {
            throw Error('All fields must be filled')
        }
        if(!validator.isAlpha(petName, ['en-US'], {ignore: '-s'})){
            throw Error('Pet name can only have letters')
        }
        if(!validator.isAlpha(petSpecies, ['en-US'], {ignore: '-s'})){
            throw Error('pet species can only have letters')
        }
        if(!validator.isAlpha(petGender, ['en-US'], {ignore: '-s'})){
            throw Error('Pet gender can only have letters')
        }
        if(!validator.isAlpha(petBreed, ['en-US'], {ignore: '-s'})){
            throw Error('Pet breed can only have letters')
        }

        const response = await pet.findByIdAndUpdate(petID, {...req.body, petImage:[...filenames]}, options)
        res.status(200).json({message: response})

    } catch(error){
        res.status(400).json({message: error.message})
    }
}

module.exports = { getAllPets, getSinglePet, getOneOwnerPets, createPet, adminCreatePet, deletePetFromID, updatePetFromID }