import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";

const Doctor = () => {

    const {doctors, dispatch:allDocDispatch} = useAllDocContext()
    const navigate = useNavigate()

    return ( 
        <>
            <button onClick={() => navigate('/admin/home/createdoctor')}>Add Doctors</button> <br /><br />
            {doctors && doctors.map(doc => (
                <>
                    {doc.name}<br />
                    {doc.email}<br />
                    {doc.contactNo}<br />
                    {doc.availability}<br />
                    <button onClick={() => navigate(`/admin/home/updatedoctor/${doc._id}`)}>update</button>
                    <button>delete</button>
                    <br />
                    <br />
                </>
            ))}
        </>
     );
}
 
export default Doctor;