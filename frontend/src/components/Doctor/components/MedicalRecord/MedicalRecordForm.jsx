import React, { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../../../context/BookingContext';

const MedicalRecordForm = () => {
    // const [vetID, setVetID] = useState('');
    // const [vetName, setVetName] = useState('');
    // const [bookingID, setBookingID ] = useState('');
    // const [date, setDate] = useState('');
    // const [petName, setPetName] = useState('');
    // const [species, setSpecies] = useState('');
    // const [gender, setGender] = useState('');
    // const [dob, setDob] = useState('');
    // const [vaccination, setVaccination] = useState('');
    // const [nextVaccination, setNextVaccination] = useState('');
    // const [remarks, setRemarks] = useState('');
    // const [symptoms, setSymptoms] = useState('');
    // const [allergies, setAllergies] = useState('');
    // const [surgicalHistory, setSurgicalHistory] = useState('');
    // const [doctors, setDoctors] = useState([]);
    // const { bookings } = useContext(BookingContext);
    // const [selectedBooking, setSelectedBooking ] = useState('')
    // const [loading, setLoading ] = useState(false);

    // const [vetID, setVetID] = useState('');
    const [vetName, setVetName] = useState('');
    const [date, setDate] = useState('');
    const [petName, setPetName] = useState('');
    const [species, setSpecies] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [vaccination, setVaccination] = useState('');
    const [nextVaccination, setNextVaccination] = useState('');
    const [remarks, setRemarks] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [allergies, setAllergies] = useState('');
    const [surgicalHistory, setSurgicalHistory] = useState('');
    const [doctors, setDoctors] = useState([]);
    const { bookings } = useContext(BookingContext);
    const [selectedBooking, setSelectedBooking] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validationError, setValidationError] = useState('');


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/doctor/availableDoctors');
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);


    // useEffect(() => {
    //     // Check if bookings exist and set the bookingID
    //     if (bookings && bookings.length > 0) {
    //         setBookingID(bookings[0]._id); // Assuming you want to use the first booking ID
    //     }
    // }, [bookings]);

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            setSelectedBooking(bookings[0]._id);
        }
    }, [bookings]);

    // const handleBookingChange = (e) => {
    //     const selectedBookingId = e.target.value; 
    //     setSelectedBooking(selectedBookingId);

    //     const setSelectedBooking = bookings.find(booking => booking.id === selectedBookingId);

    //     if (selectedBookingDetails) {
    //         setPetName(selectedBookingDetails.petName);
    //     }
    // };

    // const handleBookingChange = async (e) => {
    //     const selectedBookingId = e.target.value;
    //     setSelectedBooking(selectedBookingId);
    //     const selectedBookingDetails = bookings.find(booking => booking._id === selectedBookingId);
    //     if (selectedBookingDetails) {
    //         setPetName(selectedBookingDetails.petName);
    //         setLoading(true);
    //         try {
    //             const response = await fetch(`http://localhost:4000/api/booking/${selectedBookingId}`);
    //             const data = await response.json();
    //             setSpecies(data.species);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching booking details:', error);
    //             setLoading(false);
    //         }
    //     }
    // };

    const handleBookingChange = async (e) => {
        const selectedBookingId = e.target.value;
        setSelectedBooking(selectedBookingId);
        const selectedBookingDetails = bookings.find(booking => booking._id === selectedBookingId);
        if (selectedBookingDetails) {
            setPetName(selectedBookingDetails.petName);
            setLoading(true);

            try {
                const response = await fetch(`http://localhost:4000/api/booking/${selectedBookingId}`);
                const data = await response.json();
                setSpecies(data.species);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setLoading(false);
            }
        }
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);


        // Check for validation errors
        if ( !vetName || !date || !petName || !species || !gender || !dob || !vaccination || !nextVaccination || !remarks || !symptoms || !allergies || !surgicalHistory) {
            setValidationError('All fields are required.');
            return;
        }


        const record = {
            // vetID,
            vetName,
            bookingID: selectedBooking,
            date,
            petName,
            species,
            gender,
            dob,
            vaccination,
            nextVaccination,
            remarks,
            symptoms,
            allergies,
            surgicalHistory
        };

        // const response = await fetch('http://localhost:4000/api/medicalRec', {
        //     method: 'POST',
        //     body: JSON.stringify(record),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        try {
            const response = await fetch('http://localhost:4000/api/medicalRec', {
                method: 'POST',
                body: JSON.stringify(record),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        // if (!response.ok) {
        //     const error = await response.json();
        //     console.error('Error:', error.message);
        //     // Handle error
        //     return;
        // }

        if (!response.ok) {
            throw new Error('Failed to add medical record');
        }

        const json = await response.json();
        console.log('New medical record added:', json);

        window.alert('Medical Record Successfully Added');


        // Reset form fields after successful submission
        // setVetID('');
        setVetName('');
        setDate('');
        setPetName('');
        setSpecies('');
        setGender('');
        setDob('');
        setVaccination('');
        setNextVaccination('');
        setRemarks('');
        setSymptoms('');
        setAllergies('');
        setSurgicalHistory('');
        setFormSubmitted(false);
        setValidationError('');
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error
    }
};


    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new medical record</h3>
            {/* <label>Vet ID</label>
            <input
                type="text"
                value={vetID}
                onChange={(e) => setVetID(e.target.value)}
            /> */}

            {/* <label>Vet Name</label>
            <select
                value={vetName}
                onChange={(e) => setVetName(e.target.value)}
                required
            >
                <option value="">Select a Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                ))}
            </select> */}

            <label>Vet Name</label>
            <select
                value={vetName}
                onChange={(e) => setVetName(e.target.value)}
                required
            >
                <option value="">Select a Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                ))}
            </select>


            {/* <label>Booking ID</label>
            <input
                type="text"
                value={bookingID}
                onChange={(e) => setBookingID(e.target.value)}
            /> */}
            {/* 
<label>Booking ID</label>
            <select
                value={selectedBooking}
                onChange={handleBookingChange}
                required
            >
                <option value="">Select a Booking</option>
                {bookings.map(booking => (
                    <option key={booking._id} value={booking._id}>{booking._id}</option>
                ))}
            </select> */}

            {/* <label>Booking ID</label>
            <select
                value={selectedBooking}
                onChange={handleBookingChange}
                required
            >
                <option value="">Select a Booking</option>
                {bookings.map(booking => (
                    <option key={booking._id} value={booking._id}>{booking._id}</option>
                ))}
            </select> */}

            <label>Booking ID</label>
            {bookings && bookings.length > 0 && (
                <select
                    value={selectedBooking}
                    onChange={handleBookingChange}
                    required
                >
                    <option value="">Select a Booking</option>
                    {bookings.map(booking => (
                        <option key={booking._id} value={booking._id}>{booking._id}</option>
                    ))}
                </select>
            )}




            <label>Date</label>
            <input
                type="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />


            <label>Pet Name</label>
            <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
            />


            {/* <label>Species</label>
            <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
            /> */}

            {/* <label>Species</label>
           
                <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
            
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                
            </select>

            /> */}

            <label>Species</label>
            <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
            >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
            </select>


            {/* <label>Gender</label>
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            /> */}

            <label>Gender</label>
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label>Date of Birth</label>
            <input
                type="Date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <label>Vaccination</label>
            <input
                type="text"
                value={vaccination}
                onChange={(e) => setVaccination(e.target.value)}
            />
            <label>Next Vaccination</label>
            <input
                type="Date"
                value={nextVaccination}
                onChange={(e) => setNextVaccination(e.target.value)}
            />
            <label>Remarks</label>
            <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
            />
            <label>Symptoms</label>
            <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
            <label>Allergies</label>
            <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
            />
            <label>Surgical History</label>
            <input
                type="text"
                value={surgicalHistory}
                onChange={(e) => setSurgicalHistory(e.target.value)}
            />

{formSubmitted && validationError && (
                <div className="error">{validationError}</div>
            )}

            <button type="submit">Add Medical Record</button>

        </form>
    );
};

export default MedicalRecordForm;
