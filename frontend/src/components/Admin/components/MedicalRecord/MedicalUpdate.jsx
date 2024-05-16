import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

const MedicalUpdate = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const [record, setRecord] = useState(null)

    const [vetID, setVetID] = useState(record?.vetID);
    const [vetName, setVetName] = useState(record?.vetName);
    const [bookingID, setBookingID] = useState(record?.bookingID);
    const [date, setDate] = useState(record?.date);
    const [petName, setPetName] = useState(record?.petName);
    const [species, setSpecies] = useState(record?.species);
    const [gender, setGender] = useState(record?.gender);
    const [dob, setDob] = useState(record?.dob);
    const [vaccination, setVaccination] = useState(record?.vaccination);
    const [nextVaccination, setNextVaccination] = useState(record?.nextVaccination);
    const [remarks, setRemarks] = useState(record?.remarks);
    const [symptoms, setSymptoms] = useState(record?.symptoms);
    const [allergies, setAllergies] = useState(record?.allergies);
    const [surgicalHistory, setSurgicalHistory] = useState(record?.surgicalHistory);
    const [error, setError] = useState(null)

   

  useEffect(() => {

    const fetchRecord = async() => {
      try {
        const response = await fetch('http://localhost:4000/api/medicalRec/getMedicalRecordById/' + id);
        const json = await response.json();

        if (response.ok) {
          setRecord(json);
        }
      } catch (error) {
        console.error('Error fetching medical record:', error);
      }
    }

    fetchRecord()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()

    const record = {vetID, vetName, bookingID, date, petName, species, gender, dob, vaccination,nextVaccination, remarks, symptoms, allergies, surgicalHistory }
 
    const response = await fetch('http://localhost:4000/api/medicalRec/' + id , {
            method: 'PUT',
            body: JSON.stringify(record),
            headers: {
                'Content-Type':'application/json'
            }
    })

    const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setError(null)
            console.log('New Update Added', json)
            navigate('/doctor/home/MedicalRecord')
        }
  };


  return (
    <div className="AdminUpdateAppointments" id='AdminUpdateAppointments'>
        <div className="AdminUpdateAppointmentsHeading">Update Medical Records</div>
        <div className="AdminUpdateAppointmentsText">Update Medical Records here.</div>
        <form className="AdminUpdateAppointmentsForm" onSubmit={handleUpdate}>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Vet ID' onChange={(e) => setVetID(e.target.value)} defaultValue={record?.vetID} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Vet Name' onChange={(e) => setVetName(e.target.value)} defaultValue={record?.vetName} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Booking ID' onChange={(e) => setBookingID(e.target.value)} defaultValue={record?.bookingID} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Date' onChange={(e) => setDate(e.target.value)} defaultValue={record?.date} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={record?.petName} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Species' onChange={(e) => setSpecies(e.target.value)} defaultValue={record?.species} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Gender' onChange={(e) => setGender(e.target.value)} defaultValue={record?.gender} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='DOB' onChange={(e) => setDob(e.target.value)} defaultValue={record?.dob} required />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Vaccination' onChange={(e) => setVaccination(e.target.value)} defaultValue={record?.vaccination} />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Next Vaccination' onChange={(e) => setNextVaccination(e.target.value)} defaultValue={record?.nextVaccination} />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Remarks' onChange={(e) => setRemarks(e.target.value)} defaultValue={record?.remarks} />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Symptoms' onChange={(e) => setSymptoms(e.target.value)} defaultValue={record?.symptoms} />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Allergies' onChange={(e) => setAllergies(e.target.value)} defaultValue={record?.allergies} />
            </div>
            <div className="AdminUpdateAppointmentsFormInputWrapper">
                <input type="text" placeholder='Surgical History' onChange={(e) => setSurgicalHistory(e.target.value)} defaultValue={record?.surgicalHistory} />
            </div>
            <div className="AdminUpdateAppointmentsFormButton">
                <button type="submit">Update Medical Record</button>
            </div>
        </form>
    </div>
);

   
}

export default MedicalUpdate