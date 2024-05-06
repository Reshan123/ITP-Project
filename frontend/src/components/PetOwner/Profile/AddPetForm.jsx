import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePetContext } from "../../../hooks/usePetContext";
import { useUserContext } from "../../../hooks/userContextHook";

const AddPetForm = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF")
    const navigate = useNavigate()
    
    const { pets, dispatch: petDispatch } = usePetContext()
    const { user, dispatch: userDispatch } = useUserContext() 

    const [error, setError] = useState("")
    // do frontend validation
    const [formInputs, setFormInputs] = useState({
        petName:"",
        petAge:"",
        petSpecies:"",
        petGender:"",
        petBreed:""
    })
    const [petImage, setPetImage] = useState([])



    const handleInputChange = (e) => {
        setFormInputs({...formInputs, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('petName', formInputs.petName)
        data.append('petAge', formInputs.petAge)
        data.append('petSpecies', formInputs.petSpecies)
        data.append('petGender', formInputs.petGender)
        data.append('petBreed', formInputs.petBreed)
        for (let i = 0; i < petImage.length; i++){
            data.append('petImage', petImage[i])
        }

        const config = {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${user.userToken}`
            },
            body: data
        }
        
        try{

            const response = await fetch("http://localhost:4000/api/pet/createPet", config)

            const json = await response.json()

            if(!response.ok){
                throw Error(json.message)
            }

            petDispatch({type:"ADD PET", payload: json.message})
            navigate('/pet/profile')
            setError("")

        } catch (error){
            setError(error.message)
        }
    }

    return ( 
        <div className="addPetPage">
            <div className="backArrow">
                    <IoMdArrowRoundBack onClick={() => {navigate('/pet/profile')}} />
                </div>
            <form className="addPetForm" onSubmit={handleFormSubmit}>
                <div className="addPetFormTitle">Add Pets</div>
                {error && (<div className="error">{error}</div>)}
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petName">Pet Name</label>
                    <input type="text" name="petName" id="petName" value={formInputs.petName}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petAge">Pet Age</label>
                    <input type="text" name="petAge" id="petAge" value={formInputs.petAge}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petSpecies">Pet Species</label>
                    <input type="text" name="petSpecies" id="petSpecies" value={formInputs.petSpecies}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petGender">Pet Gender</label>
                    <input type="text" name="petGender" id="petGender" value={formInputs.petGender}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petBreed">Pet Breed</label>
                    <input type="text" name="petBreed" id="petBreed" value={formInputs.petBreed}  onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="addPetFormInputWrapper">
                    <label htmlFor="petImage">Pet Image</label>
                    <input type="file" name="petImage" id="petImage" onChange={(e) => setPetImage(e.target.files)} multiple/>
                </div>
                <div className="addPetFormSubmitButtonWrapper">
                    <button>Submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default AddPetForm;