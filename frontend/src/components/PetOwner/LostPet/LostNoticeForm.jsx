import React from 'react'
import { useState,useEffect  } from 'react'
import './styles.css'
import { useLostPetsContext } from '../../../hooks/useLostPetsContext'
import firebase from 'firebase/compat/app'
import "firebase/compat/storage"
import { useNavigate } from 'react-router-dom'

const LostNoticeForm = ({navBarProps}) => {
    navBarProps("#FFF", "#B799D1")

    const navigate = useNavigate()

    const {dispatch} = useLostPetsContext()

    const [petName, setPetName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [breed, setBreed] = useState('')
    const [description, setDescription] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [submissionStatus, setSubmissionStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const uid = JSON.parse(localStorage.getItem('user'))["uid"]
    
    const notice = {owner_id:uid,petName, ownerName, breed, description, contactNo, image, email}
    //send the data in the form tho the database
    const response = await fetch('http://localhost:4000/api/lostPetNotice',{
      method: 'POST',
      body: JSON.stringify(notice),
      headers: {
        'Content-Type': 'application/json',
        
      }
    })

      try {
        // If submission is successful, navigate to another page
      setSubmissionStatus(true);
     } catch (error) {
        console.error('Form submission failed:', error);
        // If submission fails, set submissionStatus to false
        setSubmissionStatus(false);
      }

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
      console.log('new notice added:', json)
      dispatch({type:'CREATE_LOSTPETNOTICE',payload:json})
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

useEffect(() => {
  if (submissionStatus === true) {
      window.scrollTo(0, 0);
      navigate('/pet/lostpetnotices');
  }
}, [submissionStatus]);
    

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

    <label>Description:</label>
    <textarea 
        id="description" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
        rows="4" 
        cols="50">
    </textarea>

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
            
            handleFileUpload(e)
          }}
      />
        {image=="" || image==null ? "" : <img width={100} height={100} src={image} />}
        

      <button >Publish Post</button>
        {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default LostNoticeForm
