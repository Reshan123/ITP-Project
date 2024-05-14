// // import React, { useContext, useEffect, useState } from 'react'
// // import { BookingContext } from '../../../../context/BookingContext';
// // import md5 from 'crypto-js/md5'; // Import the MD5 hashing function


// // const MedicalRecordForm = () => {
// //     // const [vetID, setVetID] = useState('');
// //     // const [vetName, setVetName] = useState('');
// //     // const [bookingID, setBookingID ] = useState('');
// //     // const [date, setDate] = useState('');
// //     // const [petName, setPetName] = useState('');
// //     // const [species, setSpecies] = useState('');
// //     // const [gender, setGender] = useState('');
// //     // const [dob, setDob] = useState('');
// //     // const [vaccination, setVaccination] = useState('');
// //     // const [nextVaccination, setNextVaccination] = useState('');
// //     // const [remarks, setRemarks] = useState('');
// //     // const [symptoms, setSymptoms] = useState('');
// //     // const [allergies, setAllergies] = useState('');
// //     // const [surgicalHistory, setSurgicalHistory] = useState('');
// //     // const [doctors, setDoctors] = useState([]);
// //     // const { bookings } = useContext(BookingContext);
// //     // const [selectedBooking, setSelectedBooking ] = useState('')
// //     // const [loading, setLoading ] = useState(false);

// //     // const [vetID, setVetID] = useState('');
// //     const [vetName, setVetName] = useState('');
// //     const [date, setDate] = useState('');
// //     const [petName, setPetName] = useState('');
// //     const [species, setSpecies] = useState('');
// //     const [gender, setGender] = useState('');
// //     const [dob, setDob] = useState('');
// //     const [vaccination, setVaccination] = useState('');
// //     const [nextVaccination, setNextVaccination] = useState('');
// //     const [remarks, setRemarks] = useState('');
// //     const [symptoms, setSymptoms] = useState('');
// //     const [allergies, setAllergies] = useState('');
// //     const [surgicalHistory, setSurgicalHistory] = useState('');
// //     const [doctors, setDoctors] = useState([]);
// //     const { bookings } = useContext(BookingContext);
// //     const [selectedBooking, setSelectedBooking] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [formSubmitted, setFormSubmitted] = useState(false);
// //     const [validationError, setValidationError] = useState('');
// //     const [shortBookingID, setShortBookingID] = useState(''); // State to store the short booking ID
   
    


// //     useEffect(() => {
// //         const fetchDoctors = async () => {
// //             try {
// //                 const response = await fetch('http://localhost:4000/api/doctor/availableDoctors');
// //                 const data = await response.json();
// //                 setDoctors(data);
// //             } catch (error) {
// //                 console.error('Error fetching doctors:', error);
// //             }
// //         };

// //         fetchDoctors();
// //     }, []);


// //     // useEffect(() => {
// //     //     // Check if bookings exist and set the bookingID
// //     //     if (bookings && bookings.length > 0) {
// //     //         setBookingID(bookings[0]._id); // Assuming you want to use the first booking ID
// //     //     }
// //     // }, [bookings]);

// //     useEffect(() => {
// //         if (bookings && bookings.length > 0) {
// //             setSelectedBooking(bookings[0]._id);
// //         }
// //     }, [bookings]);

// //     // const handleBookingChange = (e) => {
// //     //     const selectedBookingId = e.target.value; 
// //     //     setSelectedBooking(selectedBookingId);

// //     //     const setSelectedBooking = bookings.find(booking => booking.id === selectedBookingId);

// //     //     if (selectedBookingDetails) {
// //     //         setPetName(selectedBookingDetails.petName);
// //     //     }
// //     // };

// //     // const handleBookingChange = async (e) => {
// //     //     const selectedBookingId = e.target.value;
// //     //     setSelectedBooking(selectedBookingId);
// //     //     const selectedBookingDetails = bookings.find(booking => booking._id === selectedBookingId);
// //     //     if (selectedBookingDetails) {
// //     //         setPetName(selectedBookingDetails.petName);
// //     //         setLoading(true);
// //     //         try {
// //     //             const response = await fetch(`http://localhost:4000/api/booking/${selectedBookingId}`);
// //     //             const data = await response.json();
// //     //             setSpecies(data.species);
// //     //             setLoading(false);
// //     //         } catch (error) {
// //     //             console.error('Error fetching booking details:', error);
// //     //             setLoading(false);
// //     //         }
// //     //     }
// //     // };

// //     useEffect(() => {
// //         // Generate short booking ID from the first booking if bookings exist
// //         if (bookings && bookings.length > 0) {
// //             const firstBookingID = bookings[0]._id;
// //             const shortID = generateShortID(firstBookingID);
// //             setShortBookingID(shortID);
// //         }
// //     }, [bookings]);

// //     // Function to generate a short ID from a long ID using hashing
// //     const generateShortID = (longID) => {
// //         const hash = md5(longID); // Generate MD5 hash
// //         const shortID = hash.toString().substring(0, 8); // Take a portion of the hash to create a shorter ID
// //         return shortID;
// //     };


// //     const handleBookingChange = async (e) => {
// //         const selectedBookingId = e.target.value;
// //         setSelectedBooking(selectedBookingId);
// //         const selectedBookingDetails = bookings.find(booking => booking._id === selectedBookingId);
// //         if (selectedBookingDetails) {
// //             setPetName(selectedBookingDetails.petName);
// //             setLoading(true);
            
// //             try {
// //                 const response = await fetch(`http://localhost:4000/api/booking/${selectedBookingId}`);
// //                 const data = await response.json();
// //                 setSpecies(data.species);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error('Error fetching booking details:', error);
// //                 setLoading(false);
// //             }
// //         }
// //     };

// //    const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setFormSubmitted(true);


// //         // Check for validation errors
// //         if (!vetName || !date || !petName || !species || !gender || !dob || !vaccination || !nextVaccination || !remarks || !symptoms || !allergies || !surgicalHistory) {
// //             setValidationError('All fields are required.');
// //             return;
// //         }


// //         const record = {
// //             // vetID,
// //             vetName,
// //             bookingID: selectedBooking,
// //             date,
// //             petName,
// //             species,
// //             gender,
// //             dob,
// //             vaccination,
// //             nextVaccination,
// //             remarks,
// //             symptoms,
// //             allergies,
// //             surgicalHistory
// //         };

// //         // const response = await fetch('http://localhost:4000/api/medicalRec', {
// //         //     method: 'POST',
// //         //     body: JSON.stringify(record),
// //         //     headers: {
// //         //         'Content-Type': 'application/json'
// //         //     }
// //         // });

// //         try {
// //             const response = await fetch('http://localhost:4000/api/medicalRec', {
// //                 method: 'POST',
// //                 body: JSON.stringify(record),
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 }
// //             });

// //         // if (!response.ok) {
// //         //     const error = await response.json();
// //         //     console.error('Error:', error.message);
// //         //     // Handle error
// //         //     return;
// //         // }

// //         if (!response.ok) {
// //             throw new Error('Failed to add medical record');
// //         }

// //         const json = await response.json();
// //         console.log('New medical record added:', json);

// //         window.alert('Medical Record Successfully Added');


// //         // Reset form fields after successful submission
// //         // setVetID('');
// //         setVetName('');
// //         setDate('');
// //         setPetName('');
// //         setSpecies('');
// //         setGender('');
// //         setDob('');
// //         setVaccination('');
// //         setNextVaccination('');
// //         setRemarks('');
// //         setSymptoms('');
// //         setAllergies('');
// //         setSurgicalHistory('');
// //         setFormSubmitted(false);
// //         setValidationError('');
// //     } catch (error) {
// //         console.error('Error:', error.message);
// //         // Handle error
// //     }
// // };


// //     return (

// //         <form className="create" onSubmit={handleSubmit}>
// //             <h3>Add new medical record</h3>
// //             {/* <label>Vet ID</label>
// //             <input
// //                 type="text"
// //                 value={vetID}
// //                 onChange={(e) => setVetID(e.target.value)}
// //             /> */}

// //             {/* <label>Vet Name</label>
// //             <select
// //                 value={vetName}
// //                 onChange={(e) => setVetName(e.target.value)}
// //                 required
// //             >
// //                 <option value="">Select a Doctor</option>
// //                 {doctors.map(doctor => (
// //                     <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
// //                 ))}
// //             </select> */}

// //             <label>Vet Name</label>
// //             <select
// //                 value={vetName}
// //                 onChange={(e) => setVetName(e.target.value)
                    
// //                 }
// //                 required
// //             >
// //                 <option value="">Select a Doctor</option>
// //                 {doctors.map(doctor => (
// //                     <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
// //                 ))}
// //             </select>


// //             {/* <label>Booking ID</label>
// //             <input
// //                 type="text"
// //                 value={bookingID}
// //                 onChange={(e) => setBookingID(e.target.value)}
// //             /> */}
// //             {/* 
// // <label>Booking ID</label>
// //             <select
// //                 value={selectedBooking}
// //                 onChange={handleBookingChange}
// //                 required
// //             >
// //                 <option value="">Select a Booking</option>
// //                 {bookings.map(booking => (
// //                     <option key={booking._id} value={booking._id}>{booking._id}</option>
// //                 ))}
// //             </select> */}

// //             {/* <label>Booking ID</label>
// //             <select
// //                 value={selectedBooking}
// //                 onChange={handleBookingChange}
// //                 required
// //             >
// //                 <option value="">Select a Booking</option>
// //                 {bookings.map(booking => (
// //                     <option key={booking._id} value={booking._id}>{booking._id}</option>
// //                 ))}
// //             </select> */}

// //             <label>Booking ID</label>
// //             {bookings && bookings.length > 0 && (
// //                 <select
// //                     value={selectedBooking}
// //                     onChange={handleBookingChange}
// //                     required
// //                 >
// //                     <option value="">Select a Booking</option>
// //                     {bookings.map(booking => (
// //                         <option key={booking._id} value={booking._id}>{booking._id}</option>
// //                     ))}
// //                 </select>
// //             )}




// //             <label>Date</label>
// //             <input
// //                 type="Date"
// //                 value={date}
// //                 onChange={(e) => setDate(e.target.value)}
// //             />


// // <div className="AdminUpdateAppointmentsFormInputWrapper">
// //                 <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={record?.petName} required />
// //             </div>

// //             {/* <label>Species</label>
// //             <input
// //                 type="text"
// //                 value={species}
// //                 onChange={(e) => setSpecies(e.target.value)}
// //             /> */}

// //             {/* <label>Species</label>
           
// //                 <select
// //                 value={species}
// //                 onChange={(e) => setSpecies(e.target.value)}
// //                 required
            
// //                 <option value="">Select Species</option>
// //                 <option value="Dog">Dog</option>
// //                 <option value="Cat">Cat</option>
// //                 <option value="Bird">Bird</option>
                
// //             </select>

// //             /> */}

// //             <label>Species</label>
// //             <select
// //                 value={species}
// //                 onChange={(e) => setSpecies(e.target.value)}
// //                 required
// //             >
// //                 <option value="">Select Species</option>
// //                 <option value="Dog">Dog</option>
// //                 <option value="Cat">Cat</option>
// //                 <option value="Bird">Bird</option>
// //             </select>


// //             {/* <label>Gender</label>
// //             <input
// //                 type="text"
// //                 value={gender}
// //                 onChange={(e) => setGender(e.target.value)}
// //             /> */}

// //             <label>Gender</label>
// //             <select
// //                 value={gender}
// //                 onChange={(e) => setGender(e.target.value)}
// //                 required
// //             >
// //                 <option value="">Select Gender</option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //             </select>

// //             <label>Date of Birth</label>
// //             <input
// //                 type="Date"
// //                 value={dob}
// //                 onChange={(e) => setDob(e.target.value)}
// //             />
// //             <label>Vaccination</label>
// //             <input
// //                 type="text"
// //                 value={vaccination}
// //                 onChange={(e) => setVaccination(e.target.value)}
// //             />
// //             <label>Next Vaccination</label>
// //             <input
// //                 type="Date"
// //                 value={nextVaccination}
// //                 onChange={(e) => setNextVaccination(e.target.value)}
// //             />
// //             <label>Remarks</label>
// //             <input
// //                 type="text"
// //                 value={remarks}
// //                 onChange={(e) => setRemarks(e.target.value)}
// //             />
// //             <label>Symptoms</label>
// //             <input
// //                 type="text"
// //                 value={symptoms}
// //                 onChange={(e) => setSymptoms(e.target.value)}
// //             />
// //             <label>Allergies</label>
// //             <input
// //                 type="text"
// //                 value={allergies}
// //                 onChange={(e) => setAllergies(e.target.value)}
// //             />
// //             <label>Surgical History</label>
// //             <input
// //                 type="text"
// //                 value={surgicalHistory}
// //                 onChange={(e) => setSurgicalHistory(e.target.value)}
// //             />

// // {formSubmitted && validationError && (
// //                 <div className="error">{validationError}</div>
// //             )}

// //             <button type="submit">Add Medical Record</button>

// //         </form>
// //     );
// // };

// // export default MedicalRecordForm;

// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams} from 'react-router-dom'

// import md5 from 'crypto-js/md5'; // Import the MD5 hashing function

// const MedicalRecordForm = () => {
//     const { bookings } = useContext(BookingContext);
//     const [doctors, setDoctors] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [validationError, setValidationError] = useState('');
//     const [shortBookingID, setShortBookingID] = useState(''); // State to store the short booking ID

//     const [vetName, setVetName] = useState('');
//     const [date, setDate] = useState('');
//     const [petName, setPetName] = useState('');
//     const [species, setSpecies] = useState('');
//     const [gender, setGender] = useState('');
//     const [dob, setDob] = useState('');
//     const [vaccination, setVaccination] = useState('');
//     const [nextVaccination, setNextVaccination] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [symptoms, setSymptoms] = useState('');
//     const [allergies, setAllergies] = useState('');
//     const [surgicalHistory, setSurgicalHistory] = useState('');
//     const navigate = useNavigate()

//     const {id} = useParams()

//     // const [record, setRecord] = useState(null)

//     useEffect(() => {

//         const fetchRecord = async() => {
//           try {
//             const response = await fetch('http://localhost:4000/api/medicalRec/getMedicalRecordById/' + id);
//             const json = await response.json();
    
//             if (response.ok) {
//               setRecord(json);
//             }
//           } catch (error) {
//             console.error('Error fetching medical record:', error);
//           }
//         }
    
//         fetchRecord()
//       }, [id])
    
//       const handleUpdate = async (e) => {
//         e.preventDefault()
    
//         const record = {vetID, vetName, bookingID, date, petName, species, gender, dob, vaccination,nextVaccination, remarks, symptoms, allergies, surgicalHistory }
     
//         const response = await fetch('http://localhost:4000/api/medicalRec/' + id , {
//                 method: 'PUT',
//                 body: JSON.stringify(record),
//                 headers: {
//                     'Content-Type':'application/json'
//                 }
//         })
    
//         const json = await response.json()
    
//             if(!response.ok){
//                 setError(json.error)
//             }
    
//             if(response.ok){
//                 setError(null)
//                 console.log('New Update Added', json)
//                 navigate('/admin/home/MedicalRecord')
//             }
//       };
    
    


//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/doctor/availableDoctors');
//                 const data = await response.json();
//                 setDoctors(data);
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//             }
//         };

//         fetchDoctors();
//     }, []);

//     useEffect(() => {
//         if (bookings && bookings.length > 0) {
//             setSelectedBooking(bookings[0]._id);
//         }
//     }, [bookings]);

//     useEffect(() => {
//         if (bookings && bookings.length > 0) {
//             const firstBookingID = bookings[0]._id;
//             const shortID = generateShortID(firstBookingID);
//             setShortBookingID(shortID);
//         }
//     }, [bookings]);

//     const generateShortID = (longID) => {
//         const hash = md5(longID); // Generate MD5 hash
//         const shortID = hash.toString().substring(0, 8); // Take a portion of the hash to create a shorter ID
//         return shortID;
//     };

//     const handleBookingChange = async (e) => {
//         const selectedBookingId = e.target.value;
//         setSelectedBooking(selectedBookingId);
//         const selectedBookingDetails = bookings.find(booking => booking._id === selectedBookingId);
//         if (selectedBookingDetails) {
//             setPetName(selectedBookingDetails.petName);
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://localhost:4000/api/booking/${selectedBookingId}`);
//                 const data = await response.json();
//                 setSpecies(data.species);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching booking details:', error);
//                 setLoading(false);
//             }
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         if (!vetName || !date || !petName || !species || !gender || !dob || !vaccination || !nextVaccination || !remarks || !symptoms || !allergies || !surgicalHistory) {
//             setValidationError('All fields are required.');
//             return;
//         }

//         const record = {
//             vetName,
//             bookingID: selectedBooking,
//             date,
//             petName,
//             species,
//             gender,
//             dob,
//             vaccination,
//             nextVaccination,
//             remarks,
//             symptoms,
//             allergies,
//             surgicalHistory
//         };

//         try {
//             const response = await fetch('http://localhost:4000/api/medicalRec', {
//                 method: 'POST',
//                 body: JSON.stringify(record),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to add medical record');
//             }

//             const json = await response.json();
//             console.log('New medical record added:', json);

//             window.alert('Medical Record Successfully Added');

//             setVetName('');
//             setDate('');
//             setPetName('');
//             setSpecies('');
//             setGender('');
//             setDob('');
//             setVaccination('');
//             setNextVaccination('');
//             setRemarks('');
//             setSymptoms('');
//             setAllergies('');
//             setSurgicalHistory('');
//             setFormSubmitted(false);
//             setValidationError('');
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     };

//     const record = {vetID, vetName, bookingID, date, petName, species, gender, dob, vaccination,nextVaccination, remarks, symptoms, allergies, surgicalHistory }
 
//     const response = await fetch('http://localhost:4000/api/medicalRec/' + id , {
//             method: 'PUT',
//             body: JSON.stringify(record),
//             headers: {
//                 'Content-Type':'application/json'
//             }
//     })

// //     const json = await response.json()

// //         if(!response.ok){
// //             setError(json.error)
// //         }

// //         if(response.ok){
// //             setError(null)
// //             console.log('New Update Added', json)
// //             navigate('/doctor/home/MedicalRecord')
// //         }
// //   };


//     return (
//         <div className="AdminUpdateAppointments" id='AdminUpdateAppointments'>
//         <div className="AdminUpdateAppointmentsHeading">Update Medical Records</div>
//         <div className="AdminUpdateAppointmentsText">Update Medical Records here.</div>
//         <form className="AdminUpdateAppointmentsForm" onSubmit={handleUpdate}>

//             <label>Vet Name</label>
//             <select
               
//                 onChange={(e) => setVetName(e.target.value)}
//                 defaultValue={record?.vetName}
//                 required
//             >
//                 <option value="">Select a Doctor</option>
//                 {doctors.map(doctor => (
//                     <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
//                 ))}
//             </select>

//             <label>Booking ID</label>
//             {bookings && bookings.length > 0 && (
//                 <select
                    
//                     onChange={handleBookingChange}
//                     defaultValue={record?.bookingID}
//                     required
//                 >
//                     <option value="">Select a Booking</option>
//                     {bookings.map(booking => (
//                         <option key={booking._id} value={booking._id}>{booking._id}</option>
//                     ))}
//                 </select>
//             )}

//             <label>Date</label>
//             <input
//                 type="Date"
                
//                 defaultValue={record?.date} 
//                 onChange={(e) => setDate(e.target.value)}
//             />

//             <label>Species</label>
//             <select
//                 defaultValue={record?.species} 
//                 onChange={(e) => setSpecies(e.target.value)}
//                 required
//             >
//                 <option value="">Select Species</option>
//                 <option value="Dog">Dog</option>
//                 <option value="Cat">Cat</option>
//                 <option value="Bird">Bird</option>
//             </select>

//             <label>Gender</label>
//             <select
//                 defaultValue={record?.gender} 
//                 onChange={(e) => setGender(e.target.value)}
//                 required
//             >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//             </select>

//             <label>Date of Birth</label>
//             <input
//                 type="Date"
//                 defaultValue={record?.dob}
//                 onChange={(e) => setDob(e.target.value)}
//             />
// {/* 
//             <label>Vaccination</label>
//             <input
//                 type="text"
//                 efaultValue={record?.vaccination}
//                 onChange={(e) => setVaccination(e.target.value)}
//             /> */}

//             <label>Next Vaccination</label>
//             <input
//                 type="Date"
//                 defaultValue={record?.nextVaccination}
//                 onChange={(e) => setNextVaccination(e.target.value)}
//             />

// <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={record?.petName} required />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Species' onChange={(e) => setSpecies(e.target.value)} defaultValue={record?.species} required />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Gender' onChange={(e) => setGender(e.target.value)} defaultValue={record?.gender} required />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='DOB' onChange={(e) => setDob(e.target.value)} defaultValue={record?.dob} required />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Vaccination' onChange={(e) => setVaccination(e.target.value)} defaultValue={record?.vaccination} />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Next Vaccination' onChange={(e) => setNextVaccination(e.target.value)} defaultValue={record?.nextVaccination} />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Remarks' onChange={(e) => setRemarks(e.target.value)} defaultValue={record?.remarks} />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Symptoms' onChange={(e) => setSymptoms(e.target.value)} defaultValue={record?.symptoms} />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Allergies' onChange={(e) => setAllergies(e.target.value)} defaultValue={record?.allergies} />
//             </div>
//             <div className="AdminUpdateAppointmentsFormInputWrapper">
//                 <input type="text" placeholder='Surgical History' onChange={(e) => setSurgicalHistory(e.target.value)} defaultValue={record?.surgicalHistory} />
//             </div>

//             {formSubmitted && validationError && (
//                 <div className="error">{validationError}</div>
//             )}

//             <div className="add-btn">
//                 <button type="submit">Add Medical Record</button>
//             </div>

           

//         </form>
//     );
// }

// export default MedicalRecordForm;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingContext } from '../../../../context/BookingContext';
import md5 from 'crypto-js/md5';

const MedicalRecordForm = () => {
    const { bookings } = useContext(BookingContext);
    const [doctors, setDoctors] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [shortBookingID, setShortBookingID] = useState('');
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
    const navigate = useNavigate();
    const { id } = useParams();

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

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            setSelectedBooking(bookings[0]._id);
        }
    }, [bookings]);

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            const firstBookingID = bookings[0]._id;
            const shortID = generateShortID(firstBookingID);
            setShortBookingID(shortID);
        }
    }, [bookings]);

    const generateShortID = (longID) => {
        const hash = md5(longID);
        const shortID = hash.toString().substring(0, 8);
        return shortID;
    };

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

        if (!vetName || !date || !petName || !species || !gender || !dob || !vaccination || !nextVaccination || !remarks || !symptoms || !allergies || !surgicalHistory) {
            setValidationError('All fields are required.');
            return;
        }

        const record = {
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

        try {
            const response = await fetch('http://localhost:4000/api/medicalRec', {
                method: 'POST',
                body: JSON.stringify(record),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add medical record');
            }

            const json = await response.json();
            console.log('New medical record added:', json);

            window.alert('Medical Record Successfully Added');

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
        }
    };

    return (
        <div className="AdminUpdateAppointments" id='AdminUpdateAppointments'>
            <div className="AdminUpdateAppointmentsHeading">Update Medical Records</div>
            <div className="AdminUpdateAppointmentsText">Update Medical Records here.</div>
            <form className="AdminUpdateAppointmentsForm" onSubmit={handleSubmit}>
                <label>Vet Name</label>
                <select
                    onChange={(e) => setVetName(e.target.value)}
                    defaultValue={vetName}
                    required
                >
                    <option value="">Select a Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                    ))}
                </select>
                <label>Booking ID</label>
                {bookings && bookings.length > 0 && (
                    <select
                        onChange={handleBookingChange}
                        defaultValue={selectedBooking}
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
                    defaultValue={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} defaultValue={petName} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Species' onChange={(e) => setSpecies(e.target.value)} defaultValue={species} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Gender' onChange={(e) => setGender(e.target.value)} defaultValue={gender} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='DOB' onChange={(e) => setDob(e.target.value)} defaultValue={dob} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Vaccination' onChange={(e) => setVaccination(e.target.value)} defaultValue={vaccination} />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Next Vaccination' onChange={(e) => setNextVaccination(e.target.value)} defaultValue={nextVaccination} />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Remarks' onChange={(e) => setRemarks(e.target.value)} defaultValue={remarks} />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Symptoms' onChange={(e) => setSymptoms(e.target.value)} defaultValue={symptoms} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Allergies' onChange={(e) => setAllergies(e.target.value)} defaultValue={allergies} required />
                </div>
                <div className="AdminUpdateAppointmentsFormInputWrapper">
                    <input type="text" placeholder='Surgical History' onChange={(e) => setSurgicalHistory(e.target.value)} defaultValue={surgicalHistory} />
                </div>
                {formSubmitted && validationError && (
                    <div className="error">{validationError}</div>
                )}
                <div className="AdminUpdateAppointmentsFormButton">
                    <button type="submit">Add Medical Record</button>
                </div>
            </form>
        </div>
    );
};

export default MedicalRecordForm;
