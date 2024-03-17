const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adoptionFormSchema = new Schema({


    petChoice: {
        type: String, // Assuming it's an ID or a string that references a pet from user management
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
      description: {
        activityLevel: {
          type: String,
          required: true,
          enum: [
            'High (2-3 h daily)',  // High activity level
            'Moderate (1-2h daily)', // Moderate activity level
            'Low (30min-1h daily)'  // Low activity level
          ]
        },
        specialNeeds: { type: String, required: false } // Optional field for special needs
      },
      approved: {
        type: Boolean,
        default: false // Not approved by default
      }
    }, { timestamps: true });
    
    const PetAdoptionForm = mongoose.model('PetAdoptionForm', adoptionFormSchema);
    
    module.exports = PetAdoptionForm;