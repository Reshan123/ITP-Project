import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useNavigate } from "react-router-dom";


const AdoptionFormDetails = ({ adoptionForm }) => {

    const { dispatch } = useAdoptionContext()

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/adoption/' + adoptionForm._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_FORM', payload: json })
        }
    }

    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/adoptionForm/Update/${adoptionForm._id}`);
    };

    return (
        <div className="adoption-form-details">
            <h4>Pet Choice: {adoptionForm.petChoice}</h4>
            <p><strong>Name: </strong>{adoptionForm.name}</p>
            <p><strong>Age: </strong>{adoptionForm.age}</p>
            <p><strong>Species: </strong>{adoptionForm.species}</p>
            <p><strong>Breed: </strong>{adoptionForm.breed}</p>
            <p><strong>Gender: </strong>{adoptionForm.gender}</p>
            <img src={adoptionForm.imageUrl || ''} alt="Pet" style={{ width: "100px", height: "100px" }} />
            <p><strong>Owner Contact: </strong>{adoptionForm.ownerContact}</p>
            <p><strong>Activity Level: </strong>{adoptionForm.description?.activityLevel}</p>
            <p><strong>Special Needs: </strong>{adoptionForm.description?.specialNeeds}</p>

            <button onClick={handleClick}>delete</button>
            <button onClick={handleUpdateClick}>Update</button>
        </div>
    )
}

export default AdoptionFormDetails;
