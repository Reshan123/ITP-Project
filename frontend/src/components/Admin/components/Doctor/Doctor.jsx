import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles.css'

const Doctor = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
    const {doctors, dispatch:allDocDispatch} = useAllDocContext()
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentlyDisplayedItems(doctors)
    }, [doctors])

    useEffect(() => {
        if (doctors){
            const filteredList = doctors.filter(doc => { 
                return ((doc.name.toLowerCase().includes(searchQuery.toLowerCase()))  ||
                        (doc.email.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                        ((doc.contactNo.toString()).includes(searchQuery)))
            })
            setCurrentlyDisplayedItems(filteredList)
        }
    }, [searchQuery])

    const deleteDoc = async (docID) => {
        const confirmed = confirm("Are You Sure?")
        if (confirmed){
            try{

                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/doctor/deleteDoctorFromID/${docID}`, config);
                const json = await response.json()
    
                if(!response.ok){
                    throw Error(json.message)
                }
    
                allDocDispatch({type: "DELETE DOCTOR", payload:docID})
                navigate('/admin/home/doctor')
    
            } catch (error){
                console.log(error.message)
            }
        }
    }

    return ( 
        <>
            <div className="allDoctorsPage">
                <div className="allDoctorsHeader">
                    <p>All Doctor Information</p>
                    <div>
                        <input type="text" name="" id="" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        <button onClick={() => navigate('/admin/home/createdoctor')}>Add Doctors</button>
                        <button>Print</button>
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
                                <td>{doc.availability ? (<div style={{color:"green"}}>Available</div>) : (<div style={{color:"red"}}>Unavailable</div>)}</td>
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