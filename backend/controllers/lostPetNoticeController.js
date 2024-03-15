const LostNoticeInfo = require('../models/lostPetNoticeModel')
const mongoose = require('mongoose')

//Posting a notice

const createLostPetNotice = (req, res) => {
    const { petName,ownerName,breed,description,contactNo,image,email} = req.body

    //returns a promise which is resoved by the .then
    LostNoticeInfo.create({ petName,ownerName,breed,description,contactNo,image,email })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(404).json({ error: error.message })
        })
}

//getting all the notices
const getAllNotice = (req, res) => {
    //sorts in the desc order
    LostNoticeInfo.find({}).sort({ createdAt: -1 })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json({ error: error.message });
        })
}

//Getting a single notice
const getNotice = (req, res) => {
    const { id } = req.params;

    // Checking if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Coudnt find the ID' });
    }

    LostNoticeInfo.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'The notice cannot be found' });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json({ error: error.message })
        })
}

//updating the notice

const updateLostPetNotice = (req, res) => {
    const { id } = req.params;

    // Checking if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Coudnt find the valid ID' });
    }

    LostNoticeInfo.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'The notice cannot be found' });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json({ error: error.message });
        });
};

//deleting the notice

const deleteLostPetNotice = (req, res) => {
    const { id } = req.params;

    // Checking if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Coudnt find the valid ID' });
    }

    LostNoticeInfo.findOneAndDelete({ _id: id })
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Notice coudnt be deleted' });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json({ error: error.message });
        });
};

module.exports = {
    createLostPetNotice,
    getAllNotice,
    getNotice,
    updateLostPetNotice,
    deleteLostPetNotice
}