const MedicalRecord = require('../models/medicalrecord.js');

// Function to create a new medical record
const createMedicalRecord = async (request, response) => {
  try {
    // Extract fields from request body
    const {
      vetID,
      vetName,
      bookingID,
      date,
      petName,
      species,
      other,
      gender,
      dob,
      vaccination,
      nextVaccination,
      remarks,
      symptoms,
      allergies,
      surgicalHistory
    } = request.body;

    // Check if required fields are present
    if (!vetID || !vetName || !bookingID || !date || !petName || !species || !gender || !dob || !vaccination || !nextVaccination) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    // Create a new MedicalRecord instance and save to the database
    const newRecord = await MedicalRecord.create({
      vetID,
      vetName,
      bookingID,
      date,
      petName,
      species,
      other,
      gender,
      dob,
      vaccination,
      nextVaccination,
      remarks,
      symptoms,
      allergies,
      surgicalHistory
    });

    // Send the newly created MedicalRecord as response
    return response.status(201).send(newRecord);
  } catch (error) {
    // Handle any errors and send appropriate response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Function to get all medical records
const getAllMedicalRecords = async (request, response) => {
  // try {
  //   // Find all Medical Records from the database
  //   const records = await MedicalRecord.find({});

  //   // Send response with the array of Medical Records
  //   return response.status(200).json({
  //     count: records.length,
  //     data: records,
  //   });
  // } catch (error) {
  //   // Handle any errors and send appropriate response
  //   console.log(error.message);
  //   response.status(500).send({ message: error.message });
  // }
  try{
    const record = await MedicalRecord.find({})
    response.status(200).json(record)
  }catch(error){
    response.status(404).json({error:error.message})
  }
};

// Function to get a single medical record by id
const getMedicalRecordById = async (request, response) => {
  try {
    // Extract the id from request parameters
    const { id } = request.params;

    // Find the Medical Record by id from the database
    const record = await MedicalRecord.findById(id);

    // Send response with the found Medical Record
    return response.status(200).json(record);
  } catch (error) {
    // Handle any errors and send appropriate response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Function to update a medical record
const updateMedicalRecord = async (request, response) => {
  try {
    // Extract the id from request parameters
    const { id } = request.params;

    // Update the Medical Record by id with the data from request body
    const result = await MedicalRecord.findByIdAndUpdate(id, request.body);

    // If Medical Record is not found, send 404 response
    if (!result) {
      return response.status(404).json({ message: 'Medical record not found' });
    }

    // Send success response
    return response.status(200).send({ message: 'Medical record updated successfully' });
  } catch (error) {
    // Handle any errors and send appropriate response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Function to delete a medical record
const deleteMedicalRecord = async (request, response) => {
  try {
    // Extract the id from request parameters
    const { id } = request.params;

    // Delete the Medical Record by id from the database
    const result = await MedicalRecord.findByIdAndDelete(id);

    // If Medical Record is not found, send 404 response
    if (!result) {
      return response.status(404).json({ message: 'Medical record not found' });
    }

    // Send success response
    return response.status(200).send({ message: 'Medical record deleted successfully' });
  } catch (error) {
    // Handle any errors and send appropriate response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
};
