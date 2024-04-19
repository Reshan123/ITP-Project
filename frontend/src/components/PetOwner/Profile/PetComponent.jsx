import { useNavigate } from "react-router-dom";

const PetComponent = ({pet}) => {

    const navigate = useNavigate()

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
                <button className="delete">Delete</button>
            </div>

        </div>    
    );
}
 
export default PetComponent;