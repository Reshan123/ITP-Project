import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

const BookingUpdate = () => {

    const navigate = useNavigate()

    const {id} = useParams()

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

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBooking = async() => {
      try {
        const response = await fetch('http://localhost:4000/api/bookings/getBooking/' + id);
        const json = await response.json();

        if (response.ok) {
          setBooking(json);
          setStartTime(formatDateForInput(json.start_time))
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    }

    fetchBooking()
  }, [id])

  useEffect(() => {

    //fetching all available doctors
    const fetchDoctors = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/doctor/availableDoctors');
          const data = await response.json();
          setDoctors(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
    fetchDoctors();
    
  }, [])

  const formatDateForInput = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = `${dateTime.getMonth() + 1}`.padStart(2, '0'); // Months are zero-indexed
    const day = `${dateTime.getDate()}`.padStart(2, '0');
    const hours = `${dateTime.getHours()}`.padStart(2, '0');
    const minutes = `${dateTime.getMinutes()}`.padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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
            navigate('/admin/home/Booking')
        }
  };



  return (
    <div className="AdminUpdateAppointments" id='AdminUpdateAppointments'>

            <div className="AdminUpdateAppointmentsHeading">Update Appointments</div>

            <div className="AdminUpdateAppointmentsText">Update users appointment booking details here.</div>

                    <form className="AdminUpdateAppointmentsForm" onSubmit={handleUpdate}>

                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Owner Name' onChange={(e) => setOwnerName(e.target.value)} defaultValue={booking?.owner_name} disabled/>
                        </div>
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="email" placeholder='Owner Email' onChange={(e) => setOwnerEmail(e.target.value)} defaultValue={booking?.owner_email} disabled/>
                        </div>
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="number" placeholder='Owner Contact' onChange={(e) => setOwnerContact(e.target.value)} defaultValue={booking?.owner_contact} required  />
                        </div>
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={booking?.pet_name} disabled/>
                        </div>
                        {/* <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Species' onChange={(e) => setPetSpecies(e.target.value)} defaultValue={booking?.pet_species} required/>
                        </div> */}
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <select name="pet_species" value={booking?.pet_species} onChange={(e) => setPetSpecies(e.target.value)} required>
                                <option value="" disabled>Select a Species</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                            </select>
                        </div>
                        {/* <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <select name="pet_species" onChange={(e) => setPetSpecies(e.target.value)} required>
                                <option defaultValue="">Select a Species</option>
                                <option defaultValue="Dog">Dog</option>
                                <option defaultValue="Cat">Cat</option>
                                <option defaultValue="Bird">Bird</option>
                            </select>
                        </div> */}
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Breed' onChange={(e) => setPetBreed(e.target.value)} defaultValue={booking?.pet_breed}/>
                        </div>
                        {/* <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Doctor' onChange={(e) => setDoctor(e.target.value)} defaultValue={booking?.doctor} required/>
                        </div> */}
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {doctors.length === 0 ? (
                                        <input type = "text" value={"Sorry, no doctors available."} disabled/>
                                    ) : (
                                        <select name="doctor" value={booking?.doctor} onChange={(e) => setDoctor(e.target.value)} required>
                                            <option value="">Select a Doctor</option>
                                            {doctors.map(doctor => (
                                                <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <input type="datetime-local" placeholder='Start Time' onChange={(e) => setStartTime(e.target.value)} value={start_time} required />
                        </div>

                        <div className="AdminUpdateAppointmentsFormInputWrapper">
                            <textarea name="description" id="description" cols="80" rows="10" placeholder='Description (optional)' onChange={(e) => setDescription(e.target.value)} defaultValue={booking?.description}></textarea>
                        </div>
                        <div className="AdminUpdateAppointmentsFormButton">
                            <button type="submit">Update Appointment</button>
                        </div>
                    </form>
        </div>
  )
}

export default BookingUpdate