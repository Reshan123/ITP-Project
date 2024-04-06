const Booking = require('../models/bookingModel')
const mongoose = require('mongoose')

//POST new booking
const createBooking = async(req,res) => {
    const userID = req.user._id //getting user ID from token
    const {owner_name,owner_email,owner_contact,pet_name,pet_species,pet_breed,doctor,start_time,description,status} = req.body

    try{
        const booking = await Booking.create({owner_id: userID,owner_name,owner_email,owner_contact,pet_name,pet_species,pet_breed,doctor,start_time,description,status})
        res.status(200).json(booking)
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

//GET all bookings
const getBookings = async(req,res) => {
    try{
        const booking = await Booking.find({}).sort({createdAt: -1})
        res.status(200).json(booking)
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

//GET a single booking
const getBooking = async(req,res) => {
    const {id} = req.params

    //checking if the ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Booking'})
    }

    try{
        const booking = await Booking.findById(id)

        if(!booking){
            return res.status(404).json({error: 'No such Booking'})
        }

        res.status(200).json(booking)
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

//PATCH a booking
const updateBooking = async(req,res) => {
    const {id} = req.params

    //checking if the ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Booking'})
    }

    try{
        const booking = await Booking.findOneAndUpdate({_id:id}, {...req.body})

        if(!booking){
            return res.status(404).json({error: 'No such Booking'})
        }

        res.status(200).json(booking)

    }catch(error){
        res.status(404).json({error:error.message})
    }
}

//DELETE a booking
const deleteBooking = async(req,res) => {
    const {id} = req.params

    //checking if the ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Booking'})
    }

    try{
        const booking = await Booking.findOneAndDelete({_id:id})

        if(!booking){
            return res.status(404).json({error: 'No such Booking'})
        }

        res.status(200).json(booking)

    }catch(error){
        res.status(404).json({error:error.message})
    }
}


//GET all owner bookings
const getOwnerBookings = async (req, res) => {
    const userID = req.user._id;

    try {
        if (!userID) {
            throw Error("Invalid User ID");
        }

        const allbookings = await Booking.find({ owner_id: userID });

        res.status(200).json({ message: allbookings });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//GET all bookings for doctor
const getDoctorBookings = async (req, res) => {
    try {
        const doctorName = req.params.doctorName;

        const decodeDoctorName = decodeURIComponent(doctorName)
        
        const bookings = await Booking.find({ doctor: decodeDoctorName });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBooking,
    updateBooking,
    getOwnerBookings,
    deleteBooking,
    getDoctorBookings
}