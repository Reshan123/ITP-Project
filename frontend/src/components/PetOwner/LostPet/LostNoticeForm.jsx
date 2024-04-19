import React from 'react'
import { useState,useEffect  } from 'react'
import './styles.css'
import { useLostPetsContext } from '../../../hooks/useLostPetsContext'
import firebase from 'firebase/compat/app'
import "firebase/compat/storage"
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/userContextHook'


const LostNoticeForm = ({navBarProps}) => {
    navBarProps("#FFF", "#B799D1")

  const navigate = useNavigate()
  const { user } = useUserContext()

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      window.alert("Please login to add notices");
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

        <label>Pet Name:</label>
        <input
          type="text"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
        />

        <label>Owner Name:</label>
        <input
          type="text"
          onChange={(e) => setOwnerName(e.target.value)}
          value={ownerName}
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
        />

        <label>Location:</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
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
        ></textarea>

        <label>ContactNo:</label>
        <input
          type="text"
          onChange={(e) => setContactNo(e.target.value)}
          value={contactNo}
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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

        <button >Publish Post</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default LostNoticeForm
