import React, { useEffect, useState } from 'react';
import { useMedicalRecordContext } from '../../../../hooks/useMedicalRecordContext';
import { useNavigate } from 'react-router-dom'
import './styles.css';
import MedicalCard from './MedicalCard';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Pagination } from 'antd';

const MedicalRecord = () => {

  const { medicalRec, dispatch: medicalDispatch } = useMedicalRecordContext()
  const [selectedMedicalRec, setSelectedMR] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);

  //search states
  const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const navigate = useNavigate()

  if (buttonPopup) {
    document.body.classList.add('active-popup')
  } else {
    document.body.classList.remove('active-popup')
  }

  useEffect(() => {
    setCurrentlyDisplayedItems(medicalRec)
  }, [medicalRec])

 /* useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/medicalRec/");

        if (!response.ok) {
          throw Error(response.message);
        }

        const json = await response.json();

        medicalDispatch({ type: 'SET_MEDICAL_RECORD', payload: json });

      } catch (error) {
        console.log("Error fetching medical record:", error);
      }
    };

    fetchMedicalRecord();

  }, [medicalDispatch]); */

  console.log(medicalRec)

  /* useEffect(() => {
     if (medicalRec){
       const filteredList = medicalRec.filter(record => { 
         const searchQueryLower = searchQuery.toLowerCase();
         return ((record.vetName.toLowerCase().startsWith(searchQueryLower))  ||
                 (record.vetID.toLowerCase().startsWith(searchQueryLower)) ||
                 (record.bookingID.toLowerCase().startsWith(searchQueryLower)) ||
                 (record.petName.toLowerCase().startsWith(searchQueryLower)) ||
                 (record.species.toLowerCase().startsWith(searchQueryLower)) ||
                 (record.gender.toLowerCase().startsWith(searchQueryLower))) 
       })
       setCurrentlyDisplayedItems(filteredList)
     }
   }, [searchQuery])*/

  useEffect(() => {
    if (Array.isArray(medicalRec)) { // Check if medicalRec is an array
      const filteredList = medicalRec.filter(record => {
        const searchQueryLower = searchQuery.toLowerCase();
        return (
          record.vetName.toLowerCase().startsWith(searchQueryLower) ||
          record.vetID.toLowerCase().startsWith(searchQueryLower) ||
          record.bookingID.toLowerCase().startsWith(searchQueryLower) ||
          record.petName.toLowerCase().startsWith(searchQueryLower) ||
          record.species.toLowerCase().startsWith(searchQueryLower) ||
          record.gender.toLowerCase().startsWith(searchQueryLower) ||
          record.dob.toLowerCase().startsWith(searchQueryLower) ||
          record.vaccination.toLowerCase().startsWith(searchQueryLower)||
          record.nextVaccination.toLowerCase().startsWith(searchQueryLower)||
          record.remarks.toLowerCase().startsWith(searchQueryLower)||
          record.symptoms.toLowerCase().startsWith(searchQueryLower)||
          record.allergies.toLowerCase().startsWith(searchQueryLower)||
          record.surgicalHistory.toLowerCase().startsWith(searchQueryLower)
          

        );
      });
      setCurrentlyDisplayedItems(filteredList);
    }
  }, [searchQuery, medicalRec]); // Include medicalRec in the dependencies array
  


  const handleViewDetails = (record) => {
    setSelectedMR(record);
    setButtonPopup(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch('http://localhost:4000/api/medical-records/' + id, {
      method: 'DELETE'
    })

    const json = await response.json()

    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      if (response.ok) {
        medicalDispatch({ type: 'DELETE_RECORD', payload: json })
        setButtonPopup(false)
      }
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/admin/home/MedicalRecord/update/${id}`)
  }

  //Download Report Content
  const generatePDF = () => {
    const doc = new jsPDF();

    // Get the current date
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    doc.text(`Medical Record Report - ${currentDate}`, 14, 12);

    // Define the columns and rows for the table
    const columns = [
      { header: 'Vet ID', dataKey: 'vetID' },
      { header: 'Vet Name', dataKey: 'vetName' },
      { header: 'Booking ID', dataKey: 'bookingID' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Pet Name', dataKey: 'petName' },
      { header: 'Species', dataKey: 'species' },
      { header: 'Gender', dataKey: 'gender' },
      { header: 'Date of Birth', dataKey: 'dob' },
      { header: 'Vaccination', dataKey: 'vaccination' },
      { header: 'Next Vaccination', dataKey: 'nextVaccination' },
      { header: 'Remarks', dataKey: 'remarks' },
      { header: 'Symptoms', dataKey: 'symptoms' },
      { header: 'Allergies', dataKey: 'allergies' },
      { header: 'Surgical History', dataKey: 'surgicalHistory' },
    ];

    /*const filteredList = medicalRec.filter((record) => {
      const searchQueryLower = searchQuery.toLowerCase();
      return (
        record.vetName.toLowerCase().startsWith(searchQueryLower) ||
        record.vetID.toLowerCase().startsWith(searchQueryLower) ||
        record.bookingID.toLowerCase().startsWith(searchQueryLower) ||
        record.petName.toLowerCase().startsWith(searchQueryLower) ||
        record.species.toLowerCase().startsWith(searchQueryLower) ||
        record.gender.toLowerCase().startsWith(searchQueryLower) ||
        record.dob.toLowerCase().startsWith(searchQueryLower) ||
        record.vaccination.toLowerCase().startsWith(searchQueryLower)||
        record.nextVaccination.toLowerCase().startsWith(searchQueryLower)||
        record.remarks.toLowerCase().startsWith(searchQueryLower)||
        record.symptoms.toLowerCase().startsWith(searchQueryLower)||
        record.allergies.toLowerCase().startsWith(searchQueryLower)||
        record.surgicalHistory.toLowerCase().startsWith(searchQueryLower
      )
    },)*/

    const rows = filteredList.map((record) => ({
      vetID: record.vetID,
      vetName: record.vetName,
      bookingID: record.bookingID,
      date: new Date(record.date).toLocaleString(),
      petName: record.petName,
      species: record.species,
      gender: record.gender,
      dob: new Date(record.dob).toLocaleString(),
      vaccination: record.vaccination,
      nextVaccination: new Date(record.nextVaccination).toLocaleString(),
      remarks: record.remarks,
      symptoms: record.symptoms,
      allergies: record.allergies,
      surgicalHistory: record.surgicalHistory
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
        vetName: { fontStyle: 'bold' },
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
    const filename = 'medical_record_report.pdf';
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
  const currentItems = Array.isArray(currentlyDisplayedItem) ? currentlyDisplayedItem.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div className='mr-content'>
      <div className="mrHeader">
        <p>All Medical Record Details</p>
        <div>
          <input type="text" placeholder="Search Records" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button onClick={generatePDF}>Download Report</button>
          <div>
            <button className='add-btn' onClick={() => navigate(`/admin/home/MedicalRecordForm.jsx/`)} >Add a new Record</button>

          </div>
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
      <div className="mr-table">
        <table className="mr-table-style">
          <thead>
            <tr>
              <th width="10%">Vet ID</th>
              <th width="17%">Vet Name</th>
              <th width="10%">Booking ID</th>
              <th width="8%">Date</th>
              <th width="7%">Pet Name</th>
              <th width="8%">Species</th>
              <th width="12%">Gender</th>
              <th width="10%">Date of Birth</th>
              <th width="8%">Vaccination</th>
              <th width="8%">Next Vaccination</th>
              <th width="8%">Remarks</th>
              <th width="8%">Symptoms</th>
              <th width="8%">Allergies</th>
              <th width="8%">Surgical History</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((record) => (
              <tr key={record._id}>
                <td>{record.vetID}</td>
                <td>{record.vetName}</td>
                <td>{record.bookingID}</td>
                <td>{new Date(record.date).toLocaleString()}</td>
                <td>{record.petName}</td>
                <td>{record.species}</td>
                <td>{record.gender}</td>
                <td>{new Date(record.dob).toLocaleString()}</td>
                <td>{record.vaccination}</td>
                <td>{new Date(record.nextVaccination).toLocaleString()}</td>
                <td>{record.remarks}</td>
                <td>{record.symptoms}</td>
                <td>{record.allergies}</td>
                <td>{record.surgicalHistory}</td>
                <td>
                  <center>
                    <button className="table-view-btn" onClick={() => handleViewDetails(record)}>View</button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMedicalRec && (
        <MedicalCard trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className='mr-popup-details'>
            <h3>Medical Record Details</h3> <br />

            <p><strong>Vet ID:</strong> {selectedMedicalRec.vetID}</p>
            <p><strong>Vet Name:</strong> {selectedMedicalRec.vetName}</p>
            <p><strong>Booking ID:</strong>{selectedMedicalRec.bookingID}</p>
            <p><strong>Date:</strong> {new Date(selectedMedicalRec.date).toLocaleString()}</p>
            <p><strong>Pet Name:</strong> {selectedMedicalRec.petName}</p>
            <p><strong>Species:</strong> {selectedMedicalRec.species}</p>
            <p><strong>Gender:</strong> {selectedMedicalRec.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(selectedMedicalRec.dob).toLocaleString()}</p>
            <p><strong>Vaccination:</strong> {selectedMedicalRec.vaccination}</p>
            <p><strong>Next Vaccination:</strong> {new Date(selectedMedicalRec.nextVaccination).toLocaleString()}</p>
            <p data-fulltext={selectedMedicalRec.remarks} className='desc'><strong>Remarks:</strong> {selectedMedicalRec.remarks}</p>
            <p><strong>Symptoms:</strong> {selectedMedicalRec.symptoms}</p>
            <p><strong>Allergies:</strong> {selectedMedicalRec.allergies}</p>
            <p><strong>Surgical History:</strong> {selectedMedicalRec.surgicalHistory}</p>
            <br />
            <button className="table-delete-btn" onClick={() => handleDelete(selectedMedicalRec._id)}>
              Delete
            </button>
            <button className="table-update-btn" onClick={() => handleUpdate(selectedMedicalRec._id)}>
              Update
            </button>
          </div>
        </MedicalCard>
      )}
    </div>
  );
};

export default MedicalRecord;

