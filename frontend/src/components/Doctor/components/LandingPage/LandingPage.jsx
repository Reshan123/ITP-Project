import { useDoctorContext } from '../../../../hooks/useDoctorContext'
import { useEffect, useState } from "react";

const LandingPage = () => {

    const [doctorAvailability, setDoctorAvailability] = useState()
    const {doctor, dispatch} = useDoctorContext()

    useEffect(() => {
        if (doctor){
            setDoctorAvailability(doctor.availability)
        }
    }, [doctor])


    const changeAvailability = async () => {

        if(doctorAvailability){
            setDoctorAvailability(false)
        } else {
            setDoctorAvailability(true)
        }


        const config = {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${doctor.userToken}`
            }
        }
        try{
            const response = await fetch("http://localhost:4000/api/doctor/updateDoctorDetailsFromToken", config);
            const json = await response.json()

            if(!response.ok){
                throw Error(json.error)
            }

            // console.log(json)
            dispatch({type:"UPDATE AVAILABILITY", payload:json.availability})

        } catch (error){
            console.log(error.message)
        }
    }

    return ( 
        <>
            <div>Availability :  <button onClick={() => changeAvailability()}>{doctorAvailability ? "Available" : "Unavailable"}</button></div>
        </>
     );
}
 
export default LandingPage;