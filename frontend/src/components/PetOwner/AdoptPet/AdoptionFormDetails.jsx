import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import * as yup from 'yup'

const AdoptionFormDetails = ({ adoptionForm }) => {

    const { dispatch } = useAdoptionContext()
    const [formData, setFormData] = useState(adoptionForm);
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState('');

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/adoption/' + adoptionForm._id, {
            method: 'DELETE'
        })
        const confirmed = window.confirm("Are you sure you want to delete this form?");

        if (!confirmed) {
            return; // If not confirmed, return without submitting
        }
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_FORM', payload: json })
            navigate('/pet/profile')
        }
    }

    const navigate = useNavigate();

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Enter name'),
        age: yup.number().required('Enter age').positive('Age must be a positive number'),
        species: yup.string().required('Enter species'),
        breed: yup.string().required('Enter breed'),
        gender: yup.string().required('Select gender'),
        ownerContact: yup.string()
            .required('Enter owner contact')
            .matches(/^\d{10}$/, 'Owner contact must be a valid 10-digit phone number'),
        activityLevel: yup.string().required('Select activity level'),
        specialNeeds: yup.string(),
        smallDescription: yup.string().required('Enter small description')
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to submit this form?");

        if (!confirmed) {
            return; // If not confirmed, return without submitting
        }

        // Submit the updated form data to the backend API
        try {

            await validationSchema.validate(formData, { abortEarly: false })
            const response = await fetch(`http://localhost:4000/api/adoption/${adoptionForm._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const updatedData = await response.json();
            if (response.ok) {
                // Dispatch an action to update the context state
                dispatch({ type: 'SET_FORMS', payload: updatedData });
                navigate('/pet/profile')
            }
        } catch (errors) {
            console.log(errors.inner)

            const newErrors = {};
            if (errors && errors.inner) {
                errors.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
            }
            setErrors(newErrors)
        }
    };

    //File handling
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            fileRef.put(selectedFile)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            console.log(downloadURL);
                            setImageUrl(downloadURL); // Update the imageUrl state
                            setFormData(prevFormData => ({
                                ...prevFormData,
                                imageUrl: downloadURL // Update formData with imageUrl
                            }));
                        });
                });
        } else {
            console.log("No files selected");
        }
    }







    return (
        <div className="update-form-page">


            <form className="adoption-form-details" onSubmit={handleSubmit}>
                <h4>Pet Choice: {formData.petChoice}</h4>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                {errors.name && <div className="error">{errors.name}</div>}
                <label>
                    Age:
                    <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
                </label>
                {errors.age && <div className="error">{errors.age}</div>}
                <label>
                    Species:
                    <input type="text" name="species" value={formData.species} onChange={handleInputChange} />
                </label>
                {errors.species && <div className="error">{errors.species}</div>}
                <label>
                    Breed:
                    <input type="text" name="breed" value={formData.breed} onChange={handleInputChange} />
                </label>
                {errors.breed && <div className="error">{errors.breed}</div>}
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                {errors.gender && <div className="error">{errors.gender}</div>}
                <label>
                    Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            handleFileUpload(e);
                        }}
                    />
                </label>
                {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
                {formData.imageUrl && ( // Render the image only if the imageUrl is provided
                    <div>
                        <h5>Preview:</h5>
                        <img src={formData.imageUrl} alt="Pet" style={{ width: "100px", height: "100px" }} />
                    </div>
                )}
                <label>
                    Owner Contact:
                    <input type="text" name="ownerContact" value={formData.ownerContact} onChange={handleInputChange} />
                </label>
                {errors.ownerContact && <div className="error">{errors.ownerContact}</div>}
                <label>
                    Activity Level:
                    <select name="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
                        <option value="">Select...</option>
                        <option value="High (2-3 h daily)">High (2-3 h daily)</option>
                        <option value="Moderate (1-2h daily)">Moderate (1-2h daily)</option>
                        <option value="Low (30min-1h daily)">Low (30min-1h daily)</option>
                    </select>
                </label>
                {errors.activityLevel && <div className="error">{errors.activityLevel}</div>}
                <label>
                    Special Needs:
                    <textarea type="text" name="specialNeeds" value={formData.specialNeeds} onChange={handleInputChange} />
                </label>
                {errors.specialNeeds && <div className="error">{errors.specialNeeds}</div>}
                <label>
                    Description:
                    <textarea type="text" name="smallDescription" value={formData.smallDescription} onChange={handleInputChange} />
                </label>
                {errors.smallDescription && <div className="error">{errors.smallDescription}</div>}
                <div className="buttons">
                    <button type="submit">Update</button>
                    <button className="delete" onClick={handleClick}>Delete</button>
                </div>
            </form>

        </div>

    );

}

export default AdoptionFormDetails;
