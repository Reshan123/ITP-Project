
import React, { useEffect, useState } from 'react';
import { useMedicalRecordContext } from '../../../../hooks/useMedicalRecordContext';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import MedicalCard from './MedicalCard';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Pagination } from 'antd';
import QRCode from 'qrcode';

const MedicalRecord = () => {
  const { medicalRec, dispatch: medicalDispatch } = useMedicalRecordContext();
  const [selectedMedicalRec, setSelectedMR] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentlyDisplayedItems, setCurrentlyDisplayedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentlyDisplayedItems(medicalRec || []);
  }, [medicalRec]);

  useEffect(() => {
    if (selectedMedicalRec) {
      generateQRCode(selectedMedicalRec).then((qrCodeUrl) => {
        setQrCodeUrl(qrCodeUrl);
      });
    }
  }, [selectedMedicalRec]);

  const convertMedicalRecordToString = (record) => {
    if (!record) return '';
    const detailsString = `
      Vet ID: ${record.vetID}
      Vet Name: ${record.vetName}
      Booking ID: ${record.bookingID}
      Date: ${new Date(record.date).toLocaleString()}
      Pet Name: ${record.petName}
      Species: ${record.species}
      Gender: ${record.gender}
      Date of Birth: ${new Date(record.dob).toLocaleString()}
      Vaccination: ${record.vaccination}
      Next Vaccination: ${new Date(record.nextVaccination).toLocaleString()}
      Remarks: ${record.remarks}
      Symptoms: ${record.symptoms}
      Allergies: ${record.allergies}
      Surgical History: ${record.surgicalHistory}
    `;
    return detailsString;
  };

  const generateQRCode = async (record) => {
    try {
      const detailsString = convertMedicalRecordToString(record);
      if (!detailsString) return;

      const qrCodeUrl = await QRCode.toDataURL(detailsString);
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR Code: ', error);
    }
  };

  useEffect(() => {
    if (medicalRec) {
      const filteredList = medicalRec.filter(record => {
        const searchQueryLower = searchQuery.toLowerCase();
        return (
          (record.vetName.toLowerCase().startsWith(searchQueryLower)) ||
          (record.vetID.toLowerCase().startsWith(searchQueryLower)) ||
          (record.bookingID.toLowerCase().startsWith(searchQueryLower)) ||
          (record.petName.toLowerCase().startsWith(searchQueryLower)) ||
          (record.species.toLowerCase().startsWith(searchQueryLower)) ||
          (record.gender.toLowerCase().startsWith(searchQueryLower)) ||
          (record.vaccination.toLowerCase().startsWith(searchQueryLower)) ||
          (record.allergies.toLowerCase().startsWith(searchQueryLower)) ||
          (record.surgicalHistory.toLowerCase().startsWith(searchQueryLower)) 
        )
      })
      setCurrentlyDisplayedItems(filteredList)
    }
  }, [searchQuery, medicalRec]);

  const handleViewDetails = (record) => {
    setSelectedMR(record);
    setButtonPopup(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch('http://localhost:4000/api/medicalRec/' + id, {
      method: 'DELETE'
    });
    if (response.ok) {
      const json = await response.json();
      const confirmDelete = window.confirm("Are you sure you want to delete this record?");
      if (confirmDelete) {
        medicalDispatch({ type: 'DELETE_MEDICAL_RECORD', payload: json });
        setButtonPopup(false);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/home/MedicalRecord/update/${id}`);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    doc.text(`Medical Record Report - ${currentDate}`, 14, 12);

    const columns = [
      { header: 'Vet Name', dataKey: 'vetName', width: 10 },
      { header: 'Pet Name', dataKey: 'petName', width: 10 },
      { header: 'Species', dataKey: 'species', width: 10 },
      { header: 'Gender', dataKey: 'gender', width: 10 },
      { header: 'Vaccination', dataKey: 'vaccination', width: 10 },
      { header: 'Symptoms', dataKey: 'symptoms', width: 10 },
      { header: 'Allergies', dataKey: 'allergies', width: 10 },
    ];

    const rows = currentlyDisplayedItems.map((record) => ({
      vetName: record.vetName,
      petName: record.petName,
      species: record.species,
      gender: record.gender,
      vaccination: record.vaccination,
      symptoms: record.symptoms,
      allergies: record.allergies,
    }));

    doc.autoTable({
      columns,
      body: rows,
      startY: 20,
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: 'middle',
        halign: 'center',
        cellWidth: 'wrap',
      },
      columnStyles: {
        vetName: { fontStyle: 'bold' },
      },
      headerStyles: {
        fillColor: [100, 100, 100],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const pdfData = doc.output('arraybuffer');
    const filename = 'medical_record_report.pdf';

    doc.save(filename);

    generateQRCode(pdfData);

    return filename;
  };

  const totalItems = currentlyDisplayedItems ? currentlyDisplayedItems.length : 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = Array.isArray(currentlyDisplayedItems) ? currentlyDisplayedItems.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div className='mr-content'>
      <div className="mrHeader">
        <p>All Medical Record Details</p>
        <div>
          <input type="text" placeholder="Search Records" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button onClick={generatePDF}>Download Report</button>
          <button className='add-btn' onClick={() => navigate(`/doctor/home/MedicalRecord/add`)}>Add a new Record</button>
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
              <th width="10%">Vet Name</th>
              <th width="7%">Pet Name</th>
              <th width="8%">Species</th>
              <th width="6%">Gender</th>
              <th width="4%">Vaccination</th>
              <th width="4%">Symptoms</th>
              <th width="8%">Allergies</th>
              <th width="5%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((record) => (
              <tr key={record._id}>
                <td>{record.vetName}</td>
                <td>{record.petName}</td>
                <td>{record.species}</td>
                <td>{record.gender}</td>
                <td>{record.vaccination}</td>
                <td>{record.symptoms}</td>
                <td>{record.allergies}</td>
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
            <div className="QR" style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ width: '150px', height: '150px' }} />}
    </div>

            <button className="table-update-btn" onClick={() => handleUpdate(selectedMedicalRec._id)}>
              Update
            </button>
            {/* {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />} */}
            
          </div>
        </MedicalCard>
      )}
    </div>
  );
};

export default MedicalRecord;

