import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useAllPetsContext } from "../../../../hooks/useAllPetsContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './styles.css'

const AllPets = () => {

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
    const {pets, dispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 

    useEffect(() => {
        setCurrentlyDisplayedItems(pets)
    }, [pets])

    useEffect(() => {
        if (pets){
            const filteredList = pets.filter(pet => { 
                const petOwner = petOwners.filter(owner => (owner._id == pet.ownerID))
                return ((pet.petName.toLowerCase().includes(searchQuery.toLowerCase()))  ||
                        (pet.petSpecies.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                        (pet.petBreed.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                        (pet.petGender.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                        (petOwner[0].name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        ((pet.petAge.toString()).includes(searchQuery)))
            })
            setCurrentlyDisplayedItems(filteredList)
            // console.log(currentlyDisplayedItem)
        }
    }, [searchQuery])

    const deletePet = async (petID) => {
        const confimred = confirm("Are you sure?")
        if(confimred){
            try {
                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/pet/deletePetFromID/${petID}`, config);
                const json = await response.json()
    
                if(!response.ok){
                    throw Error(json.message)
                }
    
                dispatch({type: "DELETE PET", payload:petID})
                navigate('/doctor/home/pets')
    
    
            } catch (error){
                console.log(error.message)
            }
        }
    }


    //Download Report Content
    const generatePDF = () => {
        const doc = new jsPDF();

        // Get the current date
        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        doc.text(`Pet Report - ${currentDate}`, 14, 12);

        // Define the columns and rows for the table
        const columns = [

            { header: 'Pet Name', dataKey: 'petName' },
            { header: 'age', dataKey: 'petAge' },
            { header: 'Species', dataKey: 'petSpecies' },
            { header: 'Breed', dataKey: 'petBreed' },
            { header: 'Gender', dataKey: 'petGender' }
        ];

        const rows = currentlyDisplayedItem.map((pet) => ({

            petName: pet.petName,
            petAge: pet.petAge,
            petSpecies: pet.petSpecies,
            petBreed: pet.petBreed,
            petGender: pet.petGender
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
        const filename = 'petReport.pdf';
        doc.save(filename);
    };

    return ( 
        <>
            <div className="allPetsPage">
                <div className="allPetsHeader">
                    <p>All Pets Information</p>
                    <div>
                        <input type="text" name="" id="" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        <button onClick={generatePDF}>Print</button>
                        <button onClick={() => navigate('/doctor/home/createpet')}>Add Pets</button>
                    </div>
                </div>
                <hr />
                <div className="allPetCardsContainer">
                    <table className='allPetsTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Species</th>
                                <th>Breed</th>
                                <th>Gender</th>
                                <th>Owner Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentlyDisplayedItem && currentlyDisplayedItem.map(pet => (
                                <tr key={pet._id}>
                                    <td>{pet.petName}</td>
                                    <td>{pet.petAge}</td>
                                    <td>{pet.petSpecies}</td>
                                    <td>{pet.petBreed}</td>
                                    <td>{pet.petGender}</td>
                                    <td>{petOwners.map(owner => ((pet.ownerID == owner._id) && owner.name))}</td>
                                    <td>
                                        <center>
                                            {/* <button className='table-view-btn' >Medical Record</button> */}
                                            <button onClick={() => navigate(`/doctor/home/updatepet/${pet._id}`)} className='table-view-btn' >Update</button>
                                            <button onClick={() => deletePet(pet._id)} className='table-view-btn' >Delete</button>
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
 
export default AllPets;

{/*  <br /><br />
            */}