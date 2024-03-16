const express = require('express')

const Booking = require('../models/bookingModel')

const router = express.Router()

const {createBooking, getBookings, getBooking, updateBooking, deleteBooking} = require('../controllers/bookingController')

//GET all
router.get('/', getBookings )

//GET a single
router.get('/:id', getBooking)

//POST
router.post('/', createBooking)

//DELETE
router.delete('/:id', deleteBooking)

//PATCH
router.patch('/:id', updateBooking)

module.exports = router