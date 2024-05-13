import { useNavigate, useParams } from "react-router-dom";
import { useAdoptionRequestContext } from "../../../hooks/useAdoptionRequestContext"
import { useUserContext } from "../../../hooks/userContextHook";
import { useState } from "react";
import * as yup from 'yup'


const AdoptionRequestForm = () => {

    const { dispatch } = useAdoptionRequestContext()
    const { user, dispatch: userDispatch } = useUserContext()
    const navigate = useNavigate()
    const params = useParams();
    const adoptionFormIDFromURL = params.id;
    const PETNAME = params.petName


    const [petName, setPetName] = useState(PETNAME);
    const [adoptionFormID, setadoptionFormID] = useState(adoptionFormIDFromURL);
    const [contactName, setContactName] = useState(user.username);
    const [contactEmail, setContactEmail] = useState(user.email);
    const [contactPhone, setContactPhone] = useState('');
    const [residenceType, setResidenceType] = useState('House');
    const [residenceDetails, setResidenceDetails] = useState('');
    const [currentPets, setCurrentPets] = useState(false);
    const [currentPetsDetails, setCurrentPetsDetails] = useState('');
    const [reasonForAdoption, setReasonForAdoption] = useState('');

    const [errors, setErrors] = useState({});

    const validationSchema = yup.object().shape({
        contactEmail: yup.string().email('Enter a valid email').required('Email is required'),
        contactName: yup.string().required('Contact name is required'),
        contactPhone: yup.string()
            .required('Contact phone is required')
            .matches(/^[0-9]{10}$/, 'Contact phone must contain exactly 10 digits')
        ,
        petName: yup.string().required('Pet name is required'),
        reasonForAdoption: yup.string().required('Reason for adoption is required'),
        residenceDetails: yup.string().required('Residence details is required'),
        residenceType: yup.string().required('Residence type is required')
    });
    //fetching adoption form data



    const handleSubmit = async (e) => {
        e.preventDefault();

        const adoptionRequest = {
            petName,
            adoptionFormID,
            contactName,
            contactEmail,
            contactPhone,
            residenceType,
            residenceDetails,
            currentPets,
            currentPetsDetails,
            reasonForAdoption
        };

        try {
            await validationSchema.validate(adoptionRequest, { abortEarly: false });

            const response = await fetch('http://localhost:4000/api/adoptionRequest/createForm', {
                method: 'POST',
                body: JSON.stringify(adoptionRequest),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.userToken}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                console.log('Adoption request submitted successfully:', json);
                navigate('/pet/adopt');
                setadoptionFormID('');
                setPetName('');
                setContactName('');
                setContactEmail('');
                setContactPhone('');
                setResidenceType('House');
                setResidenceDetails('');
                setCurrentPets(false);
                setCurrentPetsDetails('');
                setReasonForAdoption('');
                dispatch({ type: 'CREATE_FORM', payload: json });
            } else {
                console.error('Error submitting adoption request:', json.error);
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error('Error submitting form:', error);
            }
        }
    }



    return (
        <div className="form-page">
            <div className="request-container">
                <div className="text">Adoption Request Form</div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Pet Name:</label>
                            <input
                                type="text"
                                name="petName"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                required
                                readOnly
                            />
                            {errors.petName && <div className="error">{errors.petName}</div>}
                            <div className="underline"></div>
                        </div>
                        <div className="input-container">
                            <label>Contact Name:</label>
                            <input
                                type="text"
                                name="contactName"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                required
                            />
                            {errors.contactName && <div className="error">{errors.contactName}</div>}
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Contact Email:</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                required
                            />
                            {errors.contactEmail && <div className="error">{errors.contactEmail}</div>}
                            <div className="underline"></div>
                        </div>
                        <div className="input-container">
                            <label>Contact Phone:</label>
                            <input
                                type="tel"
                                name="contactPhone"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                required
                            />
                            {errors.contactPhone && <div className="error">{errors.contactPhone}</div>}
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Residence Type:</label>
                            <select
                                name="residenceType"
                                value={residenceType}
                                onChange={(e) => setResidenceType(e.target.value)}
                                required
                            >
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="underline"></div>
                        </div>
                        <div className="input-container">
                            <label>Residence Details:</label>
                            <textarea
                                name="residenceDetails"
                                value={residenceDetails}
                                onChange={(e) => setResidenceDetails(e.target.value)}
                            ></textarea>
                            {errors.residenceDetails && <div className="error">{errors.residenceDetails}</div>}
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Do you currently have pets?</label>
                            <input
                                type="checkbox"
                                name="currentPets"
                                checked={currentPets}
                                onChange={(e) => setCurrentPets(e.target.checked)}
                            />
                            Yes
                            <input
                                type="checkbox"
                                name="currentPets"
                                checked={!currentPets}
                                onChange={(e) => setCurrentPets(!e.target.checked)}
                            />
                            No
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Current Pets Details:</label>
                            <textarea
                                name="currentPetsDetails"
                                value={currentPetsDetails}
                                onChange={(e) => setCurrentPetsDetails(e.target.value)}
                                disabled={!currentPets}
                            ></textarea>

                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <label>Reason for Adoption:</label>
                            <input
                                type="text"
                                name="reasonForAdoption"
                                value={reasonForAdoption}
                                onChange={(e) => setReasonForAdoption(e.target.value)}
                                required
                            ></input>
                            {errors.reasonForAdoption && <div className="error">{errors.reasonForAdoption}</div>}
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="form-row submit-btn">
                        <button type="submit">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>

    );

}

export default AdoptionRequestForm