import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { usePetContext } from "../../../hooks/usePetContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import './styles.css'

const PetUpdate = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF")

    const { id } = useParams()

    const {pets, dispatch} = usePetContext()
    const navigate = useNavigate()

    const [formInputs, setFormInputs] = useState({
        ownerID: "",
        petName: "",
        petAge: "",
        petSpecies: "",
        petGender: "",
        petBreed: ""
    })
    const [inputsValid, setInputsValid] = useState(true)
    const [error, setError] = useState("")
    const [petImage, setPetImage] = useState([])

    
    useEffect(() => {
        if (pets){
            pets.map(pet => {
                if (pet._id == id){
                    setFormInputs({
                        ownerID: pet.ownerID,
                        petName: pet.petName,
                        petAge: pet.petAge,
                        petSpecies: pet.petSpecies,
                        petGender: pet.petGender,
                        petBreed: pet.petBreed
                    })
                }
            })
        }
    }, [pets])

    const handleInputChange = (input) => {
        const {name, value} = input.target;
        setFormInputs(prevInput => ({...prevInput, [name]: value}))
    }

    const updatePetProfile = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('ownerID', formInputs.ownerID)
        data.append('petName', formInputs.petName)
        data.append('petAge', formInputs.petAge)
        data.append('petSpecies', formInputs.petSpecies)
        data.append('petGender', formInputs.petGender)
        data.append('petBreed', formInputs.petBreed)
        for (let i = 0; i < petImage.length; i++){
            data.append('petImage', petImage[i])
        }

        try{
            const config = {
                method: 'PUT',
                body: data
            }
            const response = await fetch("http://localhost:4000/api/pet/updatePetFromID/" + id, config);
            const json = await response.json()

            if(!response.ok){
                throw Error(json.message)
            }

            dispatch({type: "UPDATE PET", payload: [id, {...json.message}]})
            setError("")
            navigate('/pet/profile')

        } catch (error){
            setError(error.message)
        }
    }

    return ( 
        <div className="updatePetPage">
            <div className="backArrow">
                <IoMdArrowRoundBack onClick={() => {navigate('/pet/profile')}} />
            </div>
            <form className="petProfileUpdateForm" onSubmit={updatePetProfile}>
                <div className="updateFormTitle">Update Pet Profile</div>
                {error && (<div className="error">{error}</div>)}
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="name">Pet Name : </label>
                    <input type="text" name="petName" id="petName" value={formInputs.petName} onChange={handleInputChange} />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petAge">Pet Age : </label>
                    <input type="number" name="petAge" id="petAge" value={formInputs.petAge} onChange={handleInputChange} />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petSpecies">Pet Species : </label>
                    <input type="text" name="petSpecies" id="petSpecies" value={formInputs.petSpecies} onChange={handleInputChange} />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petGender">Pet Gender : </label>
                    <input type="text" name="petGender" id="petGender" value={formInputs.petGender} onChange={handleInputChange} />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petBreed">Pet Breed : </label>
                    <input type="text" name="petBreed" id="petBreed" value={formInputs.petBreed} onChange={handleInputChange} />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petImage">Pet Image</label>
                    <input type="file" name="petImage" id="petImage" onChange={(e) => setPetImage(e.target.files)} multiple/>
                </div>
                <div className="petProfileUpdateSubmitButton">
                    {inputsValid && (<button type="submit">Update Profile</button>)}
                    {!inputsValid && (<button className="disabled">Update Profile</button>)}
                </div>
            </form>
        </div>
     );
}
 
export default PetUpdate;