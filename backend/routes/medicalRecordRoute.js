const express = require('express')

const {
  getAllMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  deleteMedicalRecord,
  updateMedicalRecord
} = require('../controllers/medicalRecController.js')

const router = express.Router()


// Route for creating a new medical record
router.post('/', createMedicalRecord);

// Route for getting all medical records
router.get('/', getAllMedicalRecords);

// Route for getting a single medical record by id
router.get('/:id', getMedicalRecordById);

// Route for updating a medical record
router.put('/:id', updateMedicalRecord);

// Route for deleting a medical record
router.delete('/:id', deleteMedicalRecord);

module.exports = router;
