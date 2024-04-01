import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const AdoptionFormDetails = ({ adoptionForm }) => {

    const { dispatch } = useAdoptionContext()
    const [formData, setFormData] = useState(adoptionForm);
    const [imageUrl, setImageUrl] = useState('');

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/adoption/' + adoptionForm._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_FORM', payload: json })
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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit the updated form data to the backend API
        try {
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
                // Optionally, you can navigate to a success page or show a success message
            }
        } catch (error) {
            console.error('Error updating form:', error);
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
    };


    return (
        <div className="adoption-form-details">
            <h4>Pet Choice: {formData.petChoice}</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Age:
                    <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
                </label>
                <label>
                    Species:
                    <input type="text" name="species" value={formData.species} onChange={handleInputChange} />
                </label>
                <label>
                    Breed:
                    <input type="text" name="breed" value={formData.breed} onChange={handleInputChange} />
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
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
                <label>
                    Activity Level:
                    <input type="text" name="activityLevel" value={formData.description?.activityLevel || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Special Needs:
                    <input type="text" name="specialNeeds" value={formData.description?.specialNeeds || ''} onChange={handleInputChange} />
                </label>
                <button type="submit">Update</button>
            </form>
            <button className="adoptPetButton" onClick={handleClick}>Delete</button>
        </div>
    );

}

export default AdoptionFormDetails;
