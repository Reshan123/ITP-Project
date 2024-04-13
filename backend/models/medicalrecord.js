const mongoose = require('mongoose')

const speciesEnum = ['Dog', 'Cat', 'Bird', 'Other'];
const genderEnum = ['Male', 'Female'];

const medicalRecordSchema = mongoose.Schema(
    {
        vetID: {
            type: String,
            required: true,
        },
        vetName: {
            type: String,
            required: true,
        },
        bookingID: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        petName: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            enum: speciesEnum,
            required: true,
        },
        other: {
            type: String,
        },
        gender: {
            type: String,
            required: true,
            enum: genderEnum,
        },
        dob: {
            type: Date,
            required: true,
        },
        vaccination: {
            type: String,
            required: true,
        },
        nextVaccination: {
            type: Date,
            required: true,
        },
        remarks: {
            type: String,
        },
        symptoms: {
            type: String,
        },
        allergies: {
            type: String,
        },
        surgicalHistory: {
            type: String,
        }
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields automatically
    }
);
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord
