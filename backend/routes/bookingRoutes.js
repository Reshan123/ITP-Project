const {authorize} = require('../middlewear/validateToken')
const express = require('express')

const Booking = require('../models/bookingModel')

const router = express.Router()

const {createBooking, getBookings, getBooking, updateBooking, deleteBooking, getOwnerBookings, getDoctorBookings} = require('../controllers/bookingController')

// //GET all
router.get('/', getBookings )

// //GET a single
router.get('/getBooking/:id', getBooking)

// //POST
router.post('/', authorize, createBooking)

// //DELETE
router.delete('/:id', deleteBooking)

// //PATCH
router.patch('/:id', updateBooking)

router.get("/getOwner", authorize, getOwnerBookings)

router.get("/getDoctorBookings/:doctorName", getDoctorBookings);



module.exports = router