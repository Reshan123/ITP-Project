import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";

const Doctor = () => {

    const {doctors, dispatch:allDocDispatch} = useAllDocContext()
    const navigate = useNavigate()

    const deleteDoc = async (docID) => {
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

    return ( 
        <>
            <button onClick={() => navigate('/admin/home/createdoctor')}>Add Doctors</button> <br /><br />
            {doctors && doctors.map(doc => (
                <>
                    {doc.name}<br />
                    {doc.email}<br />
                    {doc.contactNo}<br />
                    {doc.availability ? "Available" : "Unavailable"}<br />
                    <button onClick={() => navigate(`/admin/home/updatedoctor/${doc._id}`)}>update</button>
                    <button onClick={() => deleteDoc(doc._id)}>delete</button>
                    <br />
                    <br />
                </>
            ))}
        </>
     );
}
 
export default Doctor;