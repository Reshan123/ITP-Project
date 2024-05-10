import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAdoptionRequestContext } from "../../../hooks/useAdoptionRequestContext";
import * as yup from 'yup'

const UpdateRequestForm = () => {
    const { id } = useParams();
    const { requestForms, dispatch: request } = useAdoptionRequestContext();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/adoptionRequest/getOne/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch form');
                }

                const json = await response.json();
                request({ type: 'SET_FORMS', payload: json });
            } catch (error) {
                console.error('Error fetching form:', error.message);
                // Handle error, e.g., show a message to the user
            }
        };

        fetchForms();
    }, [id, request]);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        contactEmail: '',
        contactName: '',
        contactPhone: '',
        currentPets: false,
        currentPetsDetails: '',
        petName: '',
        reasonForAdoption: '',
        residenceDetails: '',
        residenceType: '',
        status: 'Pending'
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validationSchema = yup.object().shape({
        contactEmail: yup.string().email('Enter a valid email').required('Email is required'),
        contactName: yup.string().required('Contact name is required'),
        contactPhone: yup.string().required('Contact phone is required'),
        currentPetsDetails: yup.string().required('Current pets details is required'),
        petName: yup.string().required('Pet name is required'),
        reasonForAdoption: yup.string().required('Reason for adoption is required'),
        residenceDetails: yup.string().required('Residence details is required'),
        residenceType: yup.string().required('Residence type is required'),
        status: yup.string().required('Status is required')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const response = await fetch(`http://localhost:4000/api/adoptionRequest/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData })
            });
            const json = await response.json();

            if (response.ok) {

                console.log(requestForms.status)
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
    };

    return (
        <div>
            <h2>Update Request Form</h2>
            <form >
                <label>
                    Contact Email:
                    <input type="text" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} />
                </label>
                {errors.contactEmail && <div className="error">{errors.contactEmail}</div>}

                {/* Add input fields for other fields in the request form */}

                <label>
                    Contact Name:
                    <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} />
                </label>
                {errors.contactName && <div className="error">{errors.contactName}</div>}

                <label>
                    Contact Phone:
                    <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} />
                </label>
                {errors.contactPhone && <div className="error">{errors.contactPhone}</div>}

                <label>
                    Current Pets Details:
                    <input type="text" name="currentPetsDetails" value={formData.currentPetsDetails} onChange={handleInputChange} />
                </label>
                {errors.currentPetsDetails && <div className="error">{errors.currentPetsDetails}</div>}

                {/* Repeat the above pattern for other fields */}

                <button type="submit" onClick={handleSubmit}>Update</button>
            </form>
        </div>
    );
}

export default UpdateRequestForm