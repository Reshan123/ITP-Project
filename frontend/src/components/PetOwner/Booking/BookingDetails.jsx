import React from 'react'
import { useBookingContext } from '../../../hooks/useBookingContext'
import { Link } from 'react-router-dom'

const BookingDetails = ({booking}) => {

  const {dispatch} = useBookingContext()

  const handleDelete = async() => {
      const response = await fetch('http://localhost:4000/api/bookings/' + booking._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type: 'DELETE_BOOKING', payload: json})
      }

  }

  return (
    <div className="booking-details">
        <p><strong>Doctor :</strong> {booking.doctor}</p>
        <p><strong>Pet Name :</strong> {booking.pet_name}</p>
        <p><strong>Date and Time :</strong> {new Date(booking.start_time).toLocaleString()}</p>
        <p><strong>Status :</strong> {booking.status}</p>
        <span onClick={handleDelete}>Delete</span>
        <Link className='update-btn' to={`/update/${booking._id}`}>Update</Link>
    </div>
  )
}

export default BookingDetails