const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adoptionFormSchema = new Schema({

  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  petChoice: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  imageUrl: {
    type: String,
    required: true
  },
  ownerContact: {
    type: String,
    required: true
  },
  activityLevel: {
    type: String,
    required: true,
    enum: [
      'High (2-3 h daily)',  // High activity level
      'Moderate (1-2h daily)', // Moderate activity level
      'Low (30min-1h daily)'  // Low activity level
    ]
  },
  specialNeeds: { type: String, required: false },

  smallDescription: { type: String, required: true },

  approved: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
    default: 'Pending' // Initial value is pending
  },
  adoptionStatus: {
    type: String,
    enum: ['Addopted', 'Pending'],
    default: 'Pending' // Initial value is pending
  },
}, { timestamps: true });

const PetAdoptionForm = mongoose.model('PetAdoptionForm', adoptionFormSchema);

module.exports = PetAdoptionForm;