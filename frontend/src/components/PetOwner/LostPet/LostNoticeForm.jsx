import React from 'react'
import { useState,useEffect  } from 'react'
import './styles.css'
import { useLostPetsContext } from '../../../hooks/useLostPetsContext'
import firebase from 'firebase/compat/app'
import "firebase/compat/storage"
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/userContextHook'
import { usePetContext } from '../../../hooks/usePetContext'


const LostNoticeForm = ({navBarProps}) => {
    navBarProps("#FFF", "#B799D1")

  const navigate = useNavigate()
  const { user } = useUserContext()
  const { pets, dispatch: petDispatch } = usePetContext();

    const {dispatch} = useLostPetsContext()

    const [petName, setPetName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [breed, setBreed] = useState('')
    const [description, setDescription] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [location, setLocation] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
  const [submissionStatus, setSubmissionStatus] = useState(false)

  useEffect(() => {
    if (user) {
      setOwnerName(user?.username);
      setEmail(user?.email);
    }
  }, [user]);
  
  //form validations

  const validateForm = () => {
    let isValid = true;
   

    if (!petName.trim()) {
      window.alert("Pet name is required")
      isValid = false;
      return isValid;
    }

    if (!ownerName.trim()) {
      window.alert("Owner name is required")
      isValid = false;
      return isValid;
    }

    if (!breed.trim()) {
      window.alert("Breed is required")
      isValid = false;
      return isValid;
    }

    if (!location.trim()) {
      window.alert("Location is required")
      isValid = false;
      return isValid;
    }

    if (!gender) {
      window.alert("Gender is required")
      isValid = false;
      return isValid;
    }

    if (!age) {
      window.alert("Age is required")
      isValid = false;
       return isValid;
    } else if (age <= 0) {
      window.alert("Age must be greater than 0.")
      isValid = false;
      return isValid;
    }

    if (!description.trim()) {
      window.alert("Description is required")
      isValid = false;
      return isValid;
    }

    if (!contactNo.trim()) {
      window.alert("Contact number is required");
      isValid = false;
       return isValid;
    } else if (!/^\d{10}$/.test(contactNo.trim())) {
      window.alert("Invalid contact number");
      isValid = false;
      return isValid;
    }

    if (!email.trim()) {
      window.alert("Email is required");
      isValid = false;
       return isValid;
    } else if (!/^[a-z]+@gmail\.com$/.test(email.trim())) {
      window.alert("Invalid Email address");
      isValid = false;
      return isValid;
    }

    if (!image) {
      window.alert("Please upload a Image")
      isValid = false;
      return isValid;
    }

    
    return isValid;
  };

  const handlePetSelect = async (petId) => {
    const selectedPet = pets.find((pet) => pet._id === petId);
    setPetName(selectedPet.petName);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      window.alert("Please login to add notices");
    }

    if (!validateForm()) {
      return;
    }
    
    
    const notice = {petName, ownerName, breed, description, contactNo, image, email,location,gender,age}
    //send the data in the form tho the database
    const response = await fetch("http://localhost:4000/api/lostPetNotice", {
      method: "POST",
      body: JSON.stringify(notice),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.userToken}`,
      },
    });

    

      
    const json = await response.json()

    if (!response.ok ) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setPetName('')
      setOwnerName('')
      setBreed('')
      setDescription('')
      setContactNo('')
      setImage('')
      setEmail('')
      setLocation('')
      setGender('')
      setAge(0)
      console.log('new notice added:', json)
      dispatch({type:'CREATE_LOSTPETNOTICE',payload:json})
      setSubmissionStatus(true);
      navigate('/pet/lostpetnotices')
    }

  }

 

const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0]

    if(selectedFile){
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(selectedFile.name)
         
        fileRef.put(selectedFile)
        .then((snapshot)=>{
            snapshot.ref.getDownloadURL()
            .then((downloadURL)=>{
                console.log(downloadURL)
                setImage(downloadURL)
            })
        })
    }else{
        console.log("No files selected")
    }
}


    

  return (
    <div>
      <form className="lostForm" onSubmit={handleSubmit}>
        <h3>Create A Lost Pet Post</h3>

        {/* <label>Pet Name:</label>
        <input
          type="text"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
          placeholder="Enter the first name."
        /> */}

        <label>Pet Choice:</label>
        <select
          value={petName ? petName._id : ""}
          onChange={(e) => handlePetSelect(e.target.value)}
        >
          <option value="">Select Pet</option>
          {pets?.length > 0 &&
            pets.map((pet) => (
              <option key={pet._id} value={pet._id}>
                {pet.petName}
              </option>
            ))}
        </select>

        <label>Owner Name:</label>
        <input
          type="text"
          // onChange={(e) => setOwnerName(user.username)}
          value={user.username}
        />
        {/** 
      <label for="petType">Pet Type:</label>
        <select id="petType" name="petType">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
        </select>
    */}
        <label>Breed:</label>
        <input
          type="text"
          onChange={(e) => setBreed(e.target.value)}
          value={breed}
          placeholder="Eg: Dog/Cat"
        />

        <label>Location:</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Enter the City."
        />

        <label>Gender:</label>
        <select onChange={(e) => setGender(e.target.value)} value={gender}>
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />

        <label>Description:</label>
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows="4"
          cols="50"
          placeholder="Enter a small description of the lost pet."
        ></textarea>

        <label>ContactNo:</label>
        <input
          type="text"
          onChange={(e) => setContactNo(e.target.value)}
          value={contactNo}
          placeholder="Enter the phone number(0744442544)."
        />

        <label>Email:</label>
        <input
          type="text"
          // onChange={(e) => setEmail(user.email)}
          value={user.email}
          placeholder="anonymous@gmail.com"
        />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        {image == "" || image == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image} />
        )}

        <button>Publish Post</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default LostNoticeForm
