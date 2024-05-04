import React from 'react'
import { useBookingContext } from '../../../hooks/useBookingContext'
import { Link, useNavigate } from 'react-router-dom'

const BookingDetails = ({booking}) => {

  const navigate = useNavigate()
  
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
        {/* <Link className='update-btn' to={`/pet/profile/booking-update/${booking._id}`}>Update</Link> */}
        <button className='update-btn' onClick={() =>{ window.scrollTo(0, 0); navigate(`/pet/profile/booking-update/${booking._id}`)}}>Update</button>
    </div>
  )
}

export default BookingDetails