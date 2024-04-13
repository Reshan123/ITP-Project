import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../../../hooks/userContextHook'
import { IoMdArrowRoundBack } from 'react-icons/io'

const formatDateForInput = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = `${dateTime.getMonth() + 1}`.padStart(2, '0'); // Months are zero-indexed
    const day = `${dateTime.getDate()}`.padStart(2, '0');
    const hours = `${dateTime.getHours()}`.padStart(2, '0');
    const minutes = `${dateTime.getMinutes()}`.padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

const UpdateBooking = ({ navBarProps }) => {

    const navigate = useNavigate()

    navBarProps("#B799D1", "#FFF")

    const {id} = useParams()

    const [inputValidity, setInputValidity] = useState(false)

    const [booking, setBooking] = useState(null)

    const [owner_id, setOwnerId] = useState(booking?.owner_id)
    const [owner_name, setOwnerName] = useState(booking?.owner_name)
    const [owner_email, setOwnerEmail] = useState(booking?.owner_email)
    const [owner_contact, setOwnerContact] = useState(booking?.owner_contact)
    const [pet_name, setPetName] = useState(booking?.pet_name)
    const [pet_species, setPetSpecies] = useState(booking?.pet_species)
    const [pet_breed, setPetBreed] = useState(booking?.pet_breed)
    const [doctor, setDoctor] = useState(booking?.doctor)
    const [start_time, setStartTime] = useState(booking?.start_time)
    const [description, setDescription] = useState(booking?.description)
    const [error, setError] = useState(null)

  useEffect(() => {

    const fetchBooking = async() => {
      try {
        const response = await fetch('http://localhost:4000/api/bookings/getBooking/' + id);
        const json = await response.json();

        if (response.ok) {
          setBooking(json);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }

    fetchBooking()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()

    const booking = {owner_id,owner_name,owner_email,owner_contact,pet_name,pet_species,pet_breed,doctor,start_time,description}

    const response = await fetch('http://localhost:4000/api/bookings/' + id , {
            method: 'PATCH',
            body: JSON.stringify(booking),
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
            navigate('/pet/profile')
        }
  };

  return (
    
    <div className="UpdateAppointments" id='UpdateAppointments'>

            <div className="backArrow">
                <IoMdArrowRoundBack onClick={() => {navigate('/pet/profile')}} />
            </div>

            <div className="UpdateAppointmentsHeading">Update Appointments</div>

            <div className="UpdateAppointmentsText">Update your appointment booking details here.</div>

                    <form className="UpdateAppointmentsForm" onSubmit={handleUpdate}>

                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Owner Name' onChange={(e) => setOwnerName(e.target.value)} defaultValue={booking?.owner_name} disabled/>
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="email" placeholder='Owner Email' onChange={(e) => setOwnerEmail(e.target.value)} defaultValue={booking?.owner_email} disabled/>
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="number" placeholder='Owner Contact' onChange={(e) => setOwnerContact(e.target.value)} defaultValue={booking?.owner_contact} required  />
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={booking?.pet_name} required/>
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Species' onChange={(e) => setPetSpecies(e.target.value)} defaultValue={booking?.pet_species} required/>
                        </div>
                        {/* <div className="UpdateAppointmentsFormInputWrapper">
                            <select name="pet_species" onChange={(e) => setPetSpecies(e.target.value)} required>
                                <option defaultValue="">Select a Species</option>
                                <option defaultValue="Dog">Dog</option>
                                <option defaultValue="Cat">Cat</option>
                                <option defaultValue="Bird">Bird</option>
                            </select>
                        </div> */}
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Breed' onChange={(e) => setPetBreed(e.target.value)} defaultValue={booking?.pet_breed}/>
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Doctor' onChange={(e) => setDoctor(e.target.value)} defaultValue={booking?.doctor} required/>
                        </div>
                        {/* <div className="UpdateAppointmentsFormInputWrapper">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {doctors.length === 0 ? (
                                        <input type = "text" value={"Sorry, no doctors available."} disabled/>
                                    ) : (
                                        <select name="doctor" onChange={(e) => setDoctor(e.target.value)} required>
                                            <option value="">Select a Doctor</option>
                                            {doctors.map(doctor => (
                                                <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </>
                            )}
                        </div> */}

                        <div className="UpdateAppointmentsFormInputWrapper">
                            <input type="datetime-local" placeholder='Start Time' onChange={(e) => setStartTime(e.target.value)} defaultValue={formatDateForInput(booking?.start_time)} required />
                        </div>
                        <div className="UpdateAppointmentsFormInputWrapper">
                            <textarea name="description" id="description" cols="80" rows="10" placeholder='Description (optional)' onChange={(e) => setDescription(e.target.value)} defaultValue={booking?.description}></textarea>
                        </div>
                        <div className="UpdateAppointmentsFormButton">
                            <button type="submit">Update Appointment</button>
                        </div>
                    </form>
            </div>
  )
}

export default UpdateBooking