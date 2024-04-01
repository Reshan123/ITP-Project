
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

    const { ownerID, petChoice,
        name,
        age,
        species,
        breed,
        gender,
        imageUrl,
        ownerContact,
        description: { activityLevel, specialNeeds } } = req.body

    try {
        const form = await PetAdoptionForm.create({
            ownerID: ownerID, petChoice,
            name,
            age,
            species,
            breed,
            gender,
            imageUrl,
            ownerContact,
            description: { activityLevel, specialNeeds }
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


// Get all adoption forms submitted by the authenticated user
const getOwnerAdoptionForms = async (req, res) => {
    const userID = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            throw Error("Invalid User ID");
        }

        const ownerAdoptionForms = await PetAdoptionForm.find({ ownerID: userID }).sort({ createdAt: -1 });

        res.status(200).json(ownerAdoptionForms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAdoptionForms,
    getAdoptionForm,
    createAdoptionForm,
    deleteAdoptionForm,
    updateAdoptionForm
}
