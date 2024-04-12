import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";
import './styles.css'

const Doctor = () => {

    const {doctors, dispatch:allDocDispatch} = useAllDocContext()
    const navigate = useNavigate()

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
                        <input type="text" name="" id="" placeholder="Search Text" />
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
                        {doctors && doctors.map(doc => (
                            <tr>
                                <td>{doc.name}</td>
                                <td>{doc.email}</td>
                                <td>{doc.contactNo}</td>
                                <td>{doc.availability ? "Available" : "Unavailable"}</td>
                                <td>
                                    <center>
                                        <button className="table-view-btn" onClick={() => navigate(`/admin/home/updatedoctor/${doc._id}`)}>update</button>
                                        <button className="table-view-btn" onClick={() => deleteDoc(doc._id)}>delete</button>
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