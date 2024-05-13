import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles.css'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Doctor = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
    const { doctors, dispatch: allDocDispatch } = useAllDocContext()
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentlyDisplayedItems(doctors)
    }, [doctors])

    useEffect(() => {
        if (doctors) {
            const filteredList = doctors.filter(doc => {
                return ((doc.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (doc.email.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                    ((doc.contactNo.toString()).includes(searchQuery)))
            })
            setCurrentlyDisplayedItems(filteredList)
        }
    }, [searchQuery])

    const deleteDoc = async (docID) => {
        const confirmed = confirm("Are You Sure?")
        if (confirmed) {
            try {

                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/doctor/deleteDoctorFromID/${docID}`, config);
                const json = await response.json()

                if (!response.ok) {
                    throw Error(json.message)
                }

                allDocDispatch({ type: "DELETE DOCTOR", payload: docID })
                navigate('/admin/home/doctor')

            } catch (error) {
                console.log(error.message)
            }
        }
    }

    //Download Report Content
    const generatePDF = () => {
        const doc = new jsPDF();

        // Get the current date
        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        doc.text(`Appointment Booking Report - ${currentDate}`, 14, 12);

        // Define the columns and rows for the table
        const columns = [

            { header: 'Name', dataKey: 'name' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Contact No', dataKey: 'contactNo' },
            { header: 'Availability', dataKey: 'availability' },
        ];

        const rows = currentlyDisplayedItem.map((doc) => ({

            name: doc.name,
            email: doc.email,
            contactNo: doc.contactNo,
            availability: doc.availability,
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
                cellWidth: 'auto', // Auto column width
            },
            headStyles: {
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
        const filename = 'doctoryReport.pdf';
        doc.save(filename);
    };

    return (
        <>
            <div className="allDoctorsPage">
                <div className="allDoctorsHeader">
                    <p>All Doctor Information</p>
                    <div>
                        <input type="text" name="" id="" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        <button onClick={() => navigate('/admin/home/createdoctor')}>Add Doctors</button>
                        <button onClick={generatePDF}>Print</button>
                    </div>
                </div>
                <hr />
                <div className="allDoctorCardsContainer">
                    <table className="allDoctorTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentlyDisplayedItem && currentlyDisplayedItem.map(doc => (
                                <tr key={doc._id}>
                                    <td>{doc.name}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.contactNo}</td>
                                    <td>{doc.availability ? (<div style={{ color: "green" }}>Available</div>) : (<div style={{ color: "red" }}>Unavailable</div>)}</td>
                                    <td>
                                        <center>
                                            <button className="table-view-btn" onClick={() => navigate(`/admin/home/updatedoctor/${doc._id}`)}>Update</button>
                                            <button className="table-view-btn" onClick={() => deleteDoc(doc._id)}>Delete</button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Doctor;