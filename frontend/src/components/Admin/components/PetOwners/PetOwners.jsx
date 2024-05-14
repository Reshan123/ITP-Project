import { useEffect, useState } from "react";
import { useAllPetOwnerContext } from "../../../../hooks/useAllPetOwnerContext";
import './styles.css'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PetOwners = () => {

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()
    const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        setCurrentlyDisplayedItems(petOwners)
    }, [petOwners])

    useEffect(() => {
        if (petOwners) {
            const filteredList = petOwners.filter(petOwner => {
                return ((petOwner.name.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                    (petOwner.email.toLowerCase().startsWith(searchQuery.toLowerCase())))
            })
            setCurrentlyDisplayedItems(filteredList)
        }
    }, [searchQuery])

    const deleteUser = async (userID) => {
        const confimred = confirm("Are you sure?")
        if (confimred) {
            try {
                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/petOwner/deleteUserFromUserID/${userID}`, config);
                const json = await response.json()

                if (!response.ok) {
                    throw Error(json.message)
                }

                petOwnerDispatch({ type: "DELETE PETOWNER", payload: userID })
                navigate('/admin/home/petowners')


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

        doc.text(`Pet Owners Report - ${currentDate}`, 14, 12);

        // Define the columns and rows for the table
        const columns = [

            { header: 'Name', dataKey: 'name' },
            { header: 'Email', dataKey: 'email' },
            // { header: 'Pet', dataKey: 'pet' },
        ];

        const rows = currentlyDisplayedItem.map((petOwner) => ({

            name: petOwner.name,
            email: petOwner.email,
            // pet: ,
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
        const filename = 'userReport.pdf';
        doc.save(filename);
    };

    return (
        <div className="allPetOwnerPage">
            <div className="allPetOwnerHeader">
                <p>All Pet Owner Details</p>
                <div>
                    <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <button onClick={generatePDF}>Print</button>
                </div>
            </div>
            <hr />
            <div className="allPetOwnerCardContainer">
                <table className="allPetOwnerTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentlyDisplayedItem && currentlyDisplayedItem.map(petOwner => (
                            <tr key={petOwner._id}>
                                <td>{petOwner.name}</td>
                                <td>{petOwner.email}</td>
                                <td>
                                    <center>
                                        <button onClick={() => deleteUser(petOwner._id)} className="table-view-btn">Delete</button>
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PetOwners;