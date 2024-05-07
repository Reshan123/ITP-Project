import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useAllPetsContext } from "../../../../hooks/useAllPetsContext";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const CreatePet = () => {

    const navigate = useNavigate();
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 
    const {pets, dispatch:allPetsDispatch} = useAllPetsContext()
    const [error, setError] = useState('')
    const [formInput, setFormInput] = useState({
        ownerID: "",
        petName: "",
        petAge: "",
        petSpecies: "",
        petGender: "",
        petBreed: ""
    })
    const [petImage, setPetImage] = useState([])

    const handleInputChange = (input) => {
        const {name, value} = input.target;
        setFormInput(prevInput => ({...prevInput, [name]: value}))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('ownerID', formInput.ownerID)
        data.append('petName', formInput.petName)
        data.append('petAge', formInput.petAge)
        data.append('petSpecies', formInput.petSpecies)
        data.append('petGender', formInput.petGender)
        data.append('petBreed', formInput.petBreed)
        for (let i = 0; i < petImage.length; i++){
            data.append('petImage', petImage[i])
        }

        for (let [key, value] of data) {
            console.log(`${key}: ${value}`)
        }

        console.log(petImage)
        console.log(data)

        try{
            const response = await fetch('http://localhost:4000/api/pet/adminCreatePet', {
                method: 'POST',
                body: data
            })
            const json = await response.json()
        
            if (!response.ok) {
                throw Error(json.message)
            }
            setError("")
            allPetsDispatch({type:"ADD PET",payload:json.message})
            navigate('/doctor/home/pets')
        } catch (error){
            setError(error.message)
        }
    }


    return ( 
        <div className='createPetForm'>
            <form onSubmit={handleFormSubmit}>
                <div className="formTitle">Create Pet</div>
                {error && (<div className="error">{error}</div>)}
                <div className='inputContainer'>
                    <label htmlFor="ownerID">Pet Owner: </label>
                    <select name="ownerID" id="ownerID" onChange={(e) => handleInputChange(e)}>
                        {petOwners && (petOwners.map(owner => (<option key={owner._id} value={owner._id}>{owner.name}</option>)))}
                    </select>
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petName">Pet Name: </label>
                    <input type="text" name='petName' id='petName' value={formInput.petName}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petAge">Pet Age: </label>
                    <input type="number" name="petAge" id="petAge" value={formInput.petAge} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petSpecies">Pet Species: </label>
                    <input type="text" name='petSpecies' id='petSpecies' value={formInput.petSpecies} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petGender">Pet Gender: </label>
                    <input type="text" name='petGender' id='petGender' value={formInput.petGender} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petBreed">Pet Breed: </label>
                    <input type="text" name='petBreed' id='petBreed' value={formInput.petBreed} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="petBreed">Pet Photo: </label>
                    <input type="file" name='petImage' id='petImage' onChange={(e) => setPetImage(e.target.files)} multiple/>
                </div>
                <div className='buttonContainer'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default CreatePet;