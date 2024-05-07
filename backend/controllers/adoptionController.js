
const mongoose = require('mongoose')
const PetAdoptionForm = require('../models/petAdoptionmodel')


//Get all adoption Forms
const getAdoptionForms = async (req, res) => {

    const adoptionForms = await PetAdoptionForm.find({}).sort({ createdAt: -1 })
    res.status(200).json(adoptionForms)
}

//Get a single form
const getAdoptionForm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    const AdoptionForm = await PetAdoptionForm.findById(id)

    if (!AdoptionForm) {
        return res.status(400).json({ error: 'No such form' })
    }

    res.status(200).json(AdoptionForm)
}


//create
const createAdoptionForm = async (req, res) => {
    const owner_Id = req.user._id;
    const { petChoice,
        name,
        age,
        species,
        breed,
        gender,
        imageUrl,
        ownerContact,
        activityLevel,
        specialNeeds,
        smallDescription } = req.body

    try {
        const form = await PetAdoptionForm.create({
            ownerID: owner_Id, petChoice,
            name,
            age,
            species,
            breed,
            gender,
            imageUrl,
            ownerContact,
            activityLevel,
            specialNeeds,
            smallDescription
        })
        res.status(200).json(form)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//delete
const deleteAdoptionForm = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    const form = await PetAdoptionForm.findOneAndDelete({ _id: id })

    if (!form) {
        return res.status(400).json({ error: 'No such form' })
    }

    res.status(200).json(form)

}


//update
const updateAdoptionForm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    const form = await PetAdoptionForm.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!form) {
        return res.status(400).json({ error: 'No such form' })
    }

    res.status(200).json(form)
}


const getUserAdoptionListings = async (req, res) => {

    const userID = req.user._id;

    try {
        if (!userID) {
            throw Error("Invalid User ID");
        }

        const adoptionform = await PetAdoptionForm.find({ ownerID: userID });

        res.status(200).json(adoptionform);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getAdoptionForms,
    getAdoptionForm,
    createAdoptionForm,
    deleteAdoptionForm,
    updateAdoptionForm,
    getUserAdoptionListings
}
