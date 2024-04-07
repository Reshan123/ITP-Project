import React, { useEffect } from 'react';
import { useBookingContext } from '../../../../hooks/useBookingContext';
import './styles.css'

const Booking = () => {
  const { bookings, dispatch } = useBookingContext();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/bookings/");

        if (!response.ok) {
          throw Error(response.message);
        }

        const json = await response.json();

        // Assuming the response data is an array of bookings
        dispatch({ type: 'SET_BOOKINGS', payload: json });

      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings();

  }, [dispatch]); // Make sure to include dispatch in the dependency array

  const handleDelete = (id) => {
    // Simulating delete request
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (confirmDelete) {
      // Your delete logic here
      console.log("Deleting booking with id", id);
    }
  };

  return (
    <div className="booking-table">
      <h2>Appointment Booking Details</h2><br/>
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
            <th>Status</th>
            <th width="15%">Actions</th>
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
                  <button className="table-update-btn">
                    <a href={`update_employee.php?updateid=${booking._id}`}>Update</a>
                  </button>
                  <button className="table-delete-btn" onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
