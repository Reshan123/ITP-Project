import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { usePetContext } from "../../../hooks/usePetContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import './styles.css'

const PetUpdate = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF")

    const {pet, dispatch} = usePetContext()
    const navigate = useNavigate()

    const [formInputs, setFormInputs] = useState({

    })
    const [inputsValid, setInputsValid] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (input) => {
        const {name, value} = input.target;
        setFormInputs(prevInput => ({...prevInput, [name]: value}))
    }

    const updatePetProfile = async () => {

    }

    return ( 
        <div className="updatePetPage">
            <div className="backArrow">
                <IoMdArrowRoundBack onClick={() => {navigate('/pet/profile')}} />
            </div>
            <form className="petProfileUpdateForm">
                <div className="updateFormTitle">Update Profile</div>
                {error && (<div className="error">{error}</div>)}
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="name">Pet Name : </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petAge">Pet Age : </label>
                    <input type="number" name="petAge" id="petAge" />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petSpecies">Pet Species : </label>
                    <input type="text" name="petSpecies" id="petSpecies" />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petGender">Pet Gender : </label>
                    <input type="text" name="petGender" id="petGender" />
                </div>
                <div className="petProfileUpdateInputWrapper">
                    <label htmlFor="petBreed">Pet Breed : </label>
                    <input type="text" name="petBreed" id="petBreed" />
                </div>
                <div className="petProfileUpdateSubmitButton">
                    {inputsValid && (<button type="submit" onClick={updateProfile}>Update Profile</button>)}
                    {!inputsValid && (<button className="disabled">Update Profile</button>)}
                </div>
            </form>
        </div>
     );
}
 
export default PetUpdate;