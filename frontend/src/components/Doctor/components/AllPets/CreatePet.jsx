import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useState } from 'react'

const CreatePet = () => {

    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 
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
        console.log(formInput)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
    }


    return ( 
        <>
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