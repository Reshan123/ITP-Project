import React from 'react'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import "firebase/compat/storage"
import { useNavigate } from 'react-router-dom'
const LostPetUpdateForm = ({navBarProps}) => {

  navBarProps("#FFF", "#B799D1")
  const navigate=useNavigate()

  const location = useLocation()
   const id =location.state?._id
   //console.log(id)
    

    //console.log(notice)

    const [image, setImage] = useState('')

    const [petName, setPetName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [breed, setBreed] = useState('')
    const [description, setDescription] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [email, setEmail] = useState('')
    const [locations, setLocation] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [error, setError] = useState(null)
    

    useEffect(()=>{
      if (location.state) {
        setPetName(location.state.petName || ''); // Use default value '' if petName is null
        setOwnerName(location.state.ownerName || '');
        setBreed(location.state.breed || '');
        setDescription(location.state.description || '');
        setContactNo(location.state.contactNo || '');
        setEmail(location.state.email || '');
        setLocation(location.state.location || ''); 
        setGender(location.state.gender || '');
        setAge(location.state.age || 0); // Use default value 0 if age is null
        setImage(location.state.image || '')
      }
      
     },[])

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

const updateData = async (id) =>{
  //e.preventDefault()
  
  //console.log(petName)
  //const notice = {petName, ownerName, breed, description, contactNo, image, email}
  const response = await fetch('http://localhost:4000/api/lostPetNotice/'+id, {
    method: 'PATCH',
    body: JSON.stringify({petName:petName,ownerName:ownerName,breed:breed,description:description,contactNo:contactNo,email:email,image:image,location:locations,gender:gender,age:age}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()


  if (!response.ok) {
    setError(json.error)
  }

  // window.location.href="/pet/profile"
  navigate('/pet/profile')
}

  return (
    
    <div>
        <form className="lostForm" onSubmit={(e)=>{
          e.preventDefault()
          updateData(id)
        }}> 
      <h3>Update Details</h3>

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
        disabled
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
        value={locations} 
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
        disabled
      />

    <label>Upload Image:</label>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => {
            
            handleFileUpload(e)
            setImage(e.target.value)
          }}
      />
        {image=="" || image==null ? "" : <img width={100} height={100} src={image} />}
        

      <button >Update Post</button>
        {error && <div className="error">{error}</div>}
    </form>
    </div>
    
  )
}

export default LostPetUpdateForm