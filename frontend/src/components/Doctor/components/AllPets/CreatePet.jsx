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

    const handleInputChange = (input) => {
        const {name, value} = input.target;
        setFormInput(prevInput => ({...prevInput, [name]: value}))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:4000/api/pet/adminCreatePet', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formInput)
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
        <>
            {error && (<div className="error">{error}</div>)}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="ownerID">Pet Owner: </label>
                    <select name="ownerID" id="ownerID" onChange={(e) => handleInputChange(e)}>
                        {petOwners && (petOwners.map(owner => (<option key={owner._id} value={owner._id}>{owner.name}</option>)))}
                    </select>
                </div>
                <div>
                    <label htmlFor="petName">Pet Name: </label>
                    <input type="text" name='petName' id='petName' value={formInput.petName}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="petAge">Pet Age: </label>
                    <input type="number" name="petAge" id="petAge" value={formInput.petAge} onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="petSpecies">Pet Species: </label>
                    <input type="text" name='petSpecies' id='petSpecies' value={formInput.petSpecies} onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="petGender">Pet Gender: </label>
                    <input type="text" name='petGender' id='petGender' value={formInput.petGender} onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="petBreed">Pet Breed: </label>
                    <input type="text" name='petBreed' id='petBreed' value={formInput.petBreed} onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
     );
}
 
export default CreatePet;