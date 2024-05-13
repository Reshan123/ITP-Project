import { useState } from "react";

const MedicalRecordForm = () => {
    const [vetID, setVetID] = useState('');
    const [vetName, setVetName] = useState('');
    const [bookingID, setBookingID] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const record = {
            vetID,
            vetName,
            bookingID,
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

        const response = await fetch('http://localhost:4000/api/medicalRec', {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error.message);
            // Handle error
            return;
        }

        const json = await response.json();
        console.log('New medical record added:', json);

        // Reset form fields after successful submission
        setVetID('');
        setVetName('');
        setBookingID('');
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
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new medical record</h3>
            <label>Vet ID</label>
            <input
                type="text"
                value={vetID}
                onChange={(e) => setVetID(e.target.value)}
            />
            <label>Vet Name</label>
            <input
                type="text"
                value={vetName}
                onChange={(e) => setVetName(e.target.value)}
            />
            <label>Booking ID</label>
            <input
                type="text"
                value={bookingID}
                onChange={(e) => setBookingID(e.target.value)}
            />
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
            <label>Species</label>
            <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
            />
            {/* <label>Gender</label>
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            /> */}

<label>Gender</label>
<input
    type="text"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    pattern="^(Male|Female)$"
    title="Gender must be either 'Male' or 'Female'"
/>

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
            <button>Add Medical Record</button>
        </form>
    );
};

export default MedicalRecordForm;
