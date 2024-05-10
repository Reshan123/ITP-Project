const mongoose = require('mongoose')
const adoptionRequestForm = require('../models/adoptionRequestModel')

//getAllForms
const getallRequestForms = async (req, res) => {
    const requestForms = await adoptionRequestForm.find({}).sort({ createdAt: -1 })

    res.status(200).json(requestForms)
}

//getOneForm
const getRequestForm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    try {
        const requestForm = await adoptionRequestForm.findById(id)

        if (!requestForm) {
            return res.status(400).json({ error: 'No such form' })
        }

        res.status(200).json(requestForm)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createRequestForm = async (req, res) => {
    const userID = req.user._id
    const {
        petName,
        adoptionFormID,
        contactName,
        contactEmail,
        contactPhone,
        residenceType,
        residenceDetails,
        currentPets,
        currentPetsDetails,
        reasonForAdoption,
        status
    } = req.body;

    try {
        const form = await adoptionRequestForm.create({
            userID: userID,
            petName,
            adoptionFormID,
            contactName,
            contactEmail,
            contactPhone,
            residenceType,
            residenceDetails,
            currentPets,
            currentPetsDetails,
            reasonForAdoption,
            status
        });
        res.status(200).json(form); // 201 Created status
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete
const deleteRequestForm = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    const form = await adoptionRequestForm.findOneAndDelete({ _id: id })

    if (!form) {
        return res.status(400).json({ error: 'No such form' })
    }

    res.status(200).json(form)

}


//update
const updateRequestForm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such form' })
    }

    const form = await adoptionRequestForm.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!form) {
        return res.status(400).json({ error: 'No such form' })
    }

    res.status(200).json(form)
}

const getUserRequestForm = async (req, res) => {

    const userID = req.user._id;

    try {
        if (!userID) {
            throw Error("Invalid User ID");
        }

        const form = await adoptionRequestForm.find({ userID: userID });

        res.status(200).json(form);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getallRequestForms,
    getRequestForm,
    createRequestForm,
    deleteRequestForm,
    updateRequestForm,
    getUserRequestForm

}