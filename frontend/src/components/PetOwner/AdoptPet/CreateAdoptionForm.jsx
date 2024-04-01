import { useEffect, useState } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import { useAdoptionContext } from '../../../hooks/useAdoptionContext';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useUserContext } from '../../../hooks/userContextHook';
import { usePetContext } from '../../../hooks/usePetContext';

const CreateAdoptionForm = ({ navBarProps }) => {

    navBarProps("#FFF", "#E2929D")

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

                petDispatch({ type: "LOAD", payload: petDetailsJson.message })

                console.log(pets)

            } catch (error) {
                console.log("pet owner page error", error)
            }
        }

        if (user) {
            fetchPetData()
        }

    }, [user])


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


    const validationSchema = yup.object({
        name: yup.string().required("Enter name"),
        species: yup.string().required("errrorrr")
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = JSON.parse(localStorage.getItem('user'))["uid"]

        navigate('/pet/adopt')
        const adoptionForm = {
            ownerID: uid,
            petChoice,
            name,
            age,
            species,
            breed,
            gender,
            imageUrl,
            ownerContact,
            description: {
                activityLevel,
                specialNeeds
            }
        }

        try {
            await validationSchema.validate(adoptionForm, { abortEarly: false })
            console.log(imageUrl);

            const response = await fetch('http://localhost:4000/api/adoption', {
                method: 'POST',
                body: JSON.stringify(adoptionForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();

            if (response.ok) {
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
                dispatch({ type: 'CREATE_FORM', payload: json })
            }
            else {
                setError(json.error)
            }
        } catch (errors) {
            console.log(errors.inner)

            const newErrors = {}
            errors.inner.forEach(err => {
                newErrors[err.path] = err.message
            });

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
        <form className="adoption-form" >
            <h3>Submit a Pet Adoption Form</h3>

            <label>Pet Choice:</label>
            <select
                value={selectedPet ? selectedPet._id : ''}
                onChange={(e) => handlePetSelect(e.target.value)}
            >
                <option value="">Select Pet</option>
                {pets.map(pet => (
                    <option key={pet._id} value={pet._id}>{pet.petName}</option>
                ))}
            </select>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}

            />
            {errors.name && <div className="error">{errors.name}</div>}
            <label>Age:</label>
            <input
                type="number"
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />

            <label>Species:</label>
            <input
                type="text"
                onChange={(e) => setSpecies(e.target.value)}
                value={species}
            />

            <label>Breed:</label>
            <input
                type="text"
                onChange={(e) => setBreed(e.target.value)}
                value={breed}
            />

            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label>Upload Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    handleFileUpload(e);
                }}
            />

            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Preview" width="100" height="100" />
                </div>
            )}



            <label>Owner Contact:</label>
            <input
                type="text"
                onChange={(e) => setOwnerContact(e.target.value)}
                value={ownerContact}
            />

            <label>Activity Level:</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="">Select...</option>
                <option value="High (2-3 h daily)">High (2-3 h daily)</option>
                <option value="Moderate (1-2h daily)">Moderate (1-2h daily)</option>
                <option value="Low (30min-1h daily)">Low (30min-1h daily)</option>
            </select>

            <label>Special Needs:</label>
            <input
                type="text"
                onChange={(e) => setSpecialNeeds(e.target.value)}
                value={specialNeeds}
            />

            <button className='adoptPetButton' onClick={handleSubmit} >Submit Form</button>
            {error && <div className="error">{error}</div>}
        </form>
    );

}


export default CreateAdoptionForm