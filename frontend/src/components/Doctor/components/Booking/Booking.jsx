import React, { useEffect, useState } from 'react'
import { useBookingContext } from '../../../../hooks/useBookingContext';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import ViewPopup from './ViewPopup';
import 'jspdf-autotable';
import { Pagination } from 'antd';
import { Select } from 'antd';

export const Booking = () => {

  const { bookings, dispatch: bookingDispatch } = useBookingContext();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);

  //search states
  const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const navigate = useNavigate()

  if(buttonPopup){
    document.body.classList.add('active-popup')
  }else{
    document.body.classList.remove('active-popup')
  }

  useEffect(() => {
    setCurrentlyDisplayedItems(bookings)
  }, [bookings])

  useEffect(() => {
    if (bookings){
      const filteredList = bookings.filter(booking => { 
        const searchQueryLower = searchQuery.toLowerCase();
        return ((booking.owner_name.toLowerCase().startsWith(searchQueryLower))  ||
                (booking.owner_email.toLowerCase().startsWith(searchQueryLower)) ||
                (booking.pet_name.toLowerCase().startsWith(searchQueryLower)) ||
                (booking.doctor.toLowerCase().startsWith(searchQueryLower)) ||
                (booking.status.toLowerCase().startsWith(searchQueryLower)) ||
                (booking.pet_species.toLowerCase().startsWith(searchQueryLower))) 
                
      })
        setCurrentlyDisplayedItems(filteredList)
    }
  }, [searchQuery])

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/api/bookings/");

  //       if (!response.ok) {
  //         throw Error(response.message);
  //       }

  //       const json = await response.json();

  //       dispatch({ type: 'SET_BOOKINGS', payload: json });

  //     } catch (error) {
  //       console.log("Error fetching bookings:", error);
  //     }
  //   };

  //   fetchBookings();

  // }, [dispatch]);

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
          bookingDispatch({type: 'DELETE_BOOKING', payload: json})
          setButtonPopup(false)
        }
      }
  };

  const handleUpdate = async(id) => {
    navigate(`/doctor/home/bookings/update/${id}`)
  }

//Download Report Content
const generatePDF = () => {
  const doc = new jsPDF();

  // Get the current date
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  doc.text(`Appointment Booking Report - ${currentDate}`, 14, 12);

  // Define the columns and rows for the table
  const columns = [
    { header: 'Owner Name', dataKey: 'ownerName'},
    { header: 'Contact', dataKey: 'contact' },
    { header: 'Pet Name', dataKey: 'petName' },
    { header: 'Species', dataKey: 'species' },
    { header: 'Doctor', dataKey: 'doctor' },
    { header: 'Date & Time', dataKey: 'date' },
    { header: 'Status', dataKey: 'status' },
  ];

  const filteredList = bookings.filter((booking) => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      booking.owner_name.toLowerCase().startsWith(searchQueryLower) ||
      booking.owner_email.toLowerCase().startsWith(searchQueryLower) ||
      booking.pet_name.toLowerCase().startsWith(searchQueryLower) ||
      booking.doctor.toLowerCase().startsWith(searchQueryLower) ||
      booking.status.toLowerCase().startsWith(searchQueryLower) ||
      booking.pet_species.toLowerCase().startsWith(searchQueryLower)
    );
  });

  const rows = filteredList.map((booking) => ({
    ownerName: booking.owner_name,
    contact: booking.owner_contact,
    petName: booking.pet_name,
    species: booking.pet_species,
    doctor: booking.doctor,
    date: new Date(booking.start_time).toLocaleString(),
    status: booking.status,
  }));

  // Add the table to the PDF
  doc.autoTable({

    columns,
    body: rows,
    startY: 20, 

    styles: {
      // Styles applied to the table
      cellPadding: 2,
      fontSize: 10,
      valign: 'middle',
      halign: 'center',
      cellWidth: 'wrap', // Auto column width
    },

    columnStyles: {
      // Custom styles for specific columns
      ownerName: { fontStyle: 'bold' }, 
    },

    headerStyles: {
      fillColor: [100, 100, 100], // Header background color
      textColor: [255, 255, 255], // Header text color
      fontStyle: 'bold', // Bold font for header
    },

    bodyStyles: {
      textColor: [50, 50, 50], // Body text color
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245], // Alternate row background color
    },

  });

  // Save the PDF with a unique name
  const filename = 'booking_report.pdf';
  doc.save(filename);
};

  // Pagination functions
  const totalItems = currentlyDisplayedItem ? currentlyDisplayedItem.length : 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = currentlyDisplayedItem ? currentlyDisplayedItem.slice(indexOfFirstItem, indexOfLastItem) : [];


  const handleStatusChange = (id, value) => {
    handleStatusUpdate(id, value);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:4000/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
  
      // Dispatch action to update status in context
      bookingDispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { id, status } });
    } catch (error) {
      console.error('Error updating booking status:', error.message);
    }
  };

  return (
    <div className='doctor-booking-content'>
      <div className="bookingHeader">
        <p>All Appointment Booking Details</p>
        <div>
          <input type="text" placeholder="Search Bookings" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button onClick={generatePDF}>Download Report</button>
        </div>
      </div>
      <hr />
      <div className="pagination">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
      </div>
      <div className="booking-table">
        <table className="booking-table-style">
          <thead>
            <tr>
              <th width="10%">Owner Name</th>
              <th width="17%">Email</th>
              <th width="10%">Contact</th>
              <th width="8%">Pet Name</th>
              <th width="7%">Species</th>
              <th width="8%">Pet Breed</th>
              <th width="12%">Doctor</th>
              <th width="10%">Start Time</th>
              <th width="8%">Status</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.owner_name}</td>
                <td>{booking.owner_email}</td>
                <td>{booking.owner_contact}</td>
                <td>{booking.pet_name}</td>
                <td>{booking.pet_species}</td>
                <td>{booking.pet_breed}</td>
                <td>{booking.doctor}</td>
                <td>{new Date(booking.start_time).toLocaleString()}</td>
                <td>
                    <Select value={booking.status} onChange={(e) => handleStatusChange(booking._id, e)} style={{ width: 105 }}
                        options={[
                          { value: 'pending', label: 'Pending' },
                          { value: 'approved', label: 'Approved' },
                          { value: 'completed', label: 'Completed' },
                          { value: 'cancelled', label: 'Cancelled'},
                        ]}
                    />
                </td>
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
            <p data-fulltext={selectedBooking.description} className='desc'><strong>Description:</strong> {selectedBooking.description}</p>
            <p><strong>Start Time:</strong> {new Date(selectedBooking.start_time).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p> <br/>
            <button className="table-delete-btn" onClick={() => handleDelete(selectedBooking._id)}>
                Delete
            </button>
          </div>
        </ViewPopup>
      )}
    </div>
  )
}