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
                    <button onClick={() => navigate('/admin/home/createdoctor')}>Add Doctors</button>
                </div>
                <hr />
                <div className="allDoctorCardsContainer">
                {doctors && doctors.map(doc => (
                    <div className="allDoctorCard" key={doc._id}>
                        <div className="docName">{doc.name}</div>
                        <div className="docEmail">{doc.email}</div>
                        <div className="docContactNo">{doc.contactNo}</div>
                        <div className="docAvailability">{doc.availability ? "Available" : "Unavailable"}</div>
                        <div className="buttonContainer">
                            <button onClick={() => navigate(`/admin/home/updatedoctor/${doc._id}`)}>update</button>
                            <button onClick={() => deleteDoc(doc._id)}>delete</button>
                        </div>
                    </div>
                ))}  
                </div>
            </div>
        </>
     );
}
 
export default Doctor;