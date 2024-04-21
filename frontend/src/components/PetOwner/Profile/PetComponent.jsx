import { useNavigate } from "react-router-dom";
import { usePetContext } from '../../../hooks/usePetContext';


const PetComponent = ({pet}) => {

    const navigate = useNavigate()
    const { pets, dispatch: petDispatch } = usePetContext()


    const deletePet = async (petId) => {

        const deleteApproval = confirm("Are you sure you want to delete profile?")
        if (deleteApproval) {
            try {
                const config = {
                    method: 'DELETE'
                }
                const response = await fetch("http://localhost:4000/api/pet/deletePetFromID/" + petId, config)
                const json = await response.json()
                if (!response.ok) {
                    throw Error(json.message)
                }

                petDispatch({type:"DELETE PET", payload: petId})
                
            } catch (error) {
                console.log(error.message)
            }
        }

    }

    return ( 
        <div className="petCard">
            <div className="majorDetails">
                <div className="petName">{pet.petName}</div>
                <div className="petAge">Age : {pet.petAge}</div>
            </div>
            <div className="otherDetails">
                <div className="petGender">Gender : {pet.petGender}</div>
                <div className="petSpecies">Species : {pet.petSpecies}</div>
                <div className="petBreed">Breed : {pet.petBreed}</div>
            </div>
            <div className="buttonContainer">
                <button onClick={() => {navigate("/pet/profile/petUpdate/"+ pet._id)}}>Update</button>
                <button className="delete" onClick={() => deletePet(pet._id)}>Delete</button>
            </div>

        </div>    
    );
}
 
export default PetComponent;