import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";

const Doctor = () => {

    const {doctors, dispatch:allDocDispatch} = useAllDocContext()

    return ( 
        <>
            <button>Add Doctors</button> <br /><br />
            {doctors && doctors.map(doc => (
                <>
                    {doc.name}<br />
                    {doc.email}<br />
                    {doc.contactNo}<br />
                    <button>update</button>
                    <button>delete</button>
                    <br />
                    <br />
                </>
            ))}
        </>
     );
}
 
export default Doctor;