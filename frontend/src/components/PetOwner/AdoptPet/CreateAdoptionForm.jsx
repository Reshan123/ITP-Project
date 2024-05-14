import { useEffect, useState } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import { useAdoptionContext } from '../../../hooks/useAdoptionContext';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useUserContext } from '../../../hooks/userContextHook';
import { usePetContext } from '../../../hooks/usePetContext';
import form_img from './images/adoptionform.jpg'
import upload from './images/photo_upload.png'

const CreateAdoptionForm = ({ navBarProps }) => {


    navBarProps("#E2929D", "#FFF", "#B799D1")
    const navigate = useNavigate();
    const { dispatch } = useAdoptionContext()
    const { user, dispatch: userDispatch } = useUserContext()
    const { pets, dispatch: petDispatch } = usePetContext()


    useEffect(() => {
        if (!user) {
            navigate('/pet/login')
        }
    }, [user])


    const [selectedPet, setSelectedPet] = useState(null);
    const [petChoice, setPetChoice] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ownerContact, setOwnerContact] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [specialNeeds, setSpecialNeeds] = useState('');
    const [smallDescription, setsmallDescription] = useState('');

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState('');

    const config = {
        headers: {
            "authorization": `Bearer ${user.userToken}`
        }
    }
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const petDetailsResponse = await fetch("http://localhost:4000/api/pet/getOneOwnerPets/", config)

                if (!petDetailsResponse.ok) {
                    throw Error("Invalid Token")
                }
                const petDetailsJson = await petDetailsResponse.json()

                if (petDetailsJson.message.length === 0) {
                    // If user doesn't have any pets, show error message and navigate to profile
                    console.log("User doesn't have any pets");
                    history.push("/profile"); // Assuming "/profile" is the route to the user's profile
                } else {
                    petDispatch({ type: "LOAD", payload: petDetailsJson.message });
                    console.log(pets);
                }
            } catch (error) {
                console.log("pet owner page error", error);
            }
        }

        if (user && pets && pets.length === 0) {
            fetchPetData();
        }
    }, [user, petDispatch, history]);


    const handlePetSelect = async (petId) => {
        const selectedPet = pets.find(pet => pet._id === petId);
        setSelectedPet(selectedPet);
        // Auto-fill other sections of the form
        setPetChoice(selectedPet.petName)
        setName(selectedPet.petName);
        setAge(selectedPet.petAge);
        setSpecies(selectedPet.petSpecies);
        setBreed(selectedPet.petBreed);
        setGender(selectedPet.petGender);
        // You can continue to set other fields accordingly
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const adoptionForm = {
            petChoice,
            name,
            age,
            species,
            breed,
            gender,
            imageUrl,
            ownerContact,
            activityLevel,
            specialNeeds,
            smallDescription

        }

        try {
            await validationSchema.validate(adoptionForm, { abortEarly: false })
            console.log(imageUrl);

            const response = await fetch('http://localhost:4000/api/adoption', {
                method: 'POST',
                body: JSON.stringify(adoptionForm),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.userToken}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                navigate('/pet/profile')
                setError(null);
                console.log('New adoption form added:', json);
                console.log(ownerID)
                // Reset form fields
                setPetChoice('');
                setName('');
                setAge('');
                setSpecies('');
                setBreed('');
                setGender('');
                setImageUrl('');
                setOwnerContact('');
                setActivityLevel('');
                setSpecialNeeds('');
                setsmallDescription('')
                dispatch({ type: 'CREATE_FORM', payload: json })

                navigate('/pet/adopt')
            }
            else {
                setError(json.error)
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

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0]

        if (selectedFile) {
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(selectedFile.name)

            fileRef.put(selectedFile)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            console.log(downloadURL)
                            setImageUrl(downloadURL)
                        })
                })
        } else {
            console.log("No files selected")
        }
    }



    return (
        <div className="form-page">
            <form className="adoption-form">

                <div className='right-container'>
                    <h3>Submit a Pet Adoption Form</h3>
                    <div className='set'>
                        <div className='input-container'>

                            <label>Pet Choice:</label>
                            <select
                                value={selectedPet ? selectedPet._id : ''}
                                onChange={(e) => handlePetSelect(e.target.value)}
                            >
                                <option value="">Select Pet</option>
                                {pets?.length > 0 && pets.map(pet => (
                                    <option key={pet._id} value={pet._id}>{pet.petName}</option>
                                ))}
                            </select>

                            {errors.selectedPet && <div className="error">{errors.selectedPet}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>

                            <label>Name:</label>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />

                            {errors.name && <div className="error">{errors.name}</div>}
                        </div>

                        <div className='input-container'>

                            <label>Age:</label>
                            <input
                                type="number"
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                            />

                            {errors.age && <div className="error">{errors.age}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>

                            <label>Species:</label>
                            <input
                                type="text"
                                onChange={(e) => setSpecies(e.target.value)}
                                value={species}
                            />

                            {errors.species && <div className="error">{errors.species}</div>}
                        </div>

                        <div className='input-container'>

                            <label>Breed:</label>
                            <input
                                type="text"
                                onChange={(e) => setBreed(e.target.value)}
                                value={breed}
                            />

                            {errors.breed && <div className="error">{errors.breed}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>
                            <label>Gender:</label>
                            <input
                                id='pet-gender-male'
                                name='pet-gender'
                                type='radio'
                                value='Male'
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label for='pet-gender-male'>Male</label>

                            <input
                                id='pet-gender-female'
                                name='pet-gender'
                                type='radio'
                                value='Female'
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label for='pet-gender-female'>Female</label>

                            {errors.gender && <div className="error">{errors.gender}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>

                            <label htmlFor="image-upload" className="custom-file-upload">
                                Upload Your Photo:
                                <img src={upload} alt="Upload Image" />

                            </label>
                            <input id="image-upload" type="file" accept="image/*" onChange={(e) => {
                                handleFileUpload(e);
                            }} style={{ display: 'none' }} />

                            {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>

                            <label>Owner Contact:</label>
                            <input
                                type="text"
                                onChange={(e) => setOwnerContact(e.target.value)}
                                value={ownerContact}
                            />

                            {errors.ownerContact && <div className="error">{errors.ownerContact}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>

                            <label>Activity Level:</label>
                            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                                <option value="">Select...</option>
                                <option value="High (2-3 h daily)">High (2-3 h daily)</option>
                                <option value="Moderate (1-2h daily)">Moderate (1-2h daily)</option>
                                <option value="Low (30min-1h daily)">Low (30min-1h daily)</option>
                            </select>

                            {errors.activityLevel && <div className="error">{errors.activityLevel}</div>}
                        </div>
                    </div>
                    <div className='set'>
                        <div className='input-container'>
                            <div className="special-needs">
                                <label>Special Needs:</label>
                                <textarea
                                    onChange={(e) => setSpecialNeeds(e.target.value)}
                                    value={specialNeeds}
                                ></textarea>
                            </div>
                            {errors.specialNeeds && <div className="error">{errors.specialNeeds}</div>}
                        </div>
                    </div>

                    <div className='set'>
                        <div className='input-container'>
                            <div className="description">
                                <label>Small Description About Your Pet:</label>
                                <textarea
                                    onChange={(e) => setsmallDescription(e.target.value)}
                                    value={smallDescription}
                                ></textarea>
                            </div>
                            {errors.smallDescription && <div className="error">{errors.smallDescription}</div>}
                        </div>
                    </div>

                    <div className='adoptbutton-container'>
                        <button className='adoptPetButton' onClick={handleSubmit}>Submit Form</button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </form>
        </div>


    );

}


export default CreateAdoptionForm