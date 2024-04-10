import React, { useEffect, useState } from 'react';
import { useBookingContext } from '../../../../hooks/useBookingContext';
import './styles.css';
import ViewPopup from './ViewPopup';

const Booking = () => {
  const { bookings, dispatch } = useBookingContext();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);

  // if(buttonPopup){
  //   document.body.classList.add('active-popup')
  // }else{
  //   document.body.classList.remove('active-popup')
  // }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/bookings/");

        if (!response.ok) {
          throw Error(response.message);
        }

        const json = await response.json();

        dispatch({ type: 'SET_BOOKINGS', payload: json });

      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();

  }, [dispatch]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setButtonPopup(true);
  };

  const handleDelete = async(id) => {
    const response = await fetch('http://localhost:4000/api/bookings/' + id, {
        method: 'DELETE'
      })

      const json = await response.json()

      const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
      if (confirmDelete) {
        if(response.ok){
          dispatch({type: 'DELETE_BOOKING', payload: json})
          setButtonPopup(false)
        }
      }
  };

  return (
    <div className='booking-content'>
      <div className="bookingHeader">
        <p>All Appointment Booking Details</p>
      </div>
      <hr />
      <div className="booking-table">
        <table className="booking-table-style">
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Pet Name</th>
              <th>Pet Species</th>
              <th width="8%">Pet Breed</th>
              <th>Doctor</th>
              <th width="10%">Start Time</th>
              <th width="10%">Status</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.owner_name}</td>
                <td>{booking.owner_email}</td>
                <td>{booking.owner_contact}</td>
                <td>{booking.pet_name}</td>
                <td>{booking.pet_species}</td>
                <td>{booking.pet_breed}</td>
                <td>{booking.doctor}</td>
                <td>{new Date(booking.start_time).toLocaleString()}</td>
                <td>{booking.status}</td>
                <td>
                  <center>
                    <button className="table-view-btn" onClick={() => handleViewDetails(booking)}>View</button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
        <ViewPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className='booking-popup-details'>
            <h3>Booking Details</h3> <br/>
            <p><strong>Owner Name:</strong> {selectedBooking.owner_name}</p>
            <p><strong>Email:</strong> {selectedBooking.owner_email}</p>
            <p><strong>Contact:</strong>{selectedBooking.owner_contact}</p>
            <p><strong>Pet Name:</strong> {selectedBooking.pet_name}</p>
            <p><strong>Pet Species:</strong> {selectedBooking.pet_species}</p>
            <p><strong>Pet Breed:</strong> {selectedBooking.pet_breed}</p>
            <p><strong>Doctor:</strong> {selectedBooking.doctor}</p>
            <p><strong>Start Time:</strong> {new Date(selectedBooking.start_time).toLocaleString()}</p>
            <p><strong>Description:</strong> {selectedBooking.description}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p> <br/>
            <button className="table-delete-btn" onClick={() => handleDelete(selectedBooking._id)}>
                Delete
            </button>
            <button className="table-update-btn">
                Update
            </button>
          </div>
        </ViewPopup>
      )}
    </div>
  );
};

export default Booking;
