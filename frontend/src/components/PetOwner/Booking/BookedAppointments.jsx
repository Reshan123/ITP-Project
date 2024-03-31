import React, {useEffect} from 'react'
import './styles.css'
import BookingDetails from '../Booking/BookingDetails'
import { useBookingContext } from '../../../hooks/useBookingContext'

const BookedAppointments = ({ navBarProps }) => {

    navBarProps("#FFF", "#B799D1")

    const {bookings, dispatch} = useBookingContext()

    useEffect(() => {
        const fetchBookings = async() => {
            const response = await fetch('http://localhost:4000/api/bookings')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_BOOKINGS', payload: json})
            }
        }

        fetchBookings()
    }, [dispatch])

  return (
    <div className='booked-appointments'>
        <div className='bookings'>
            {bookings && bookings.map((booking) => (
                <BookingDetails key={booking._id} booking = {booking}/>
            ))}
        </div>
    </div>
  )
}

export default BookedAppointments