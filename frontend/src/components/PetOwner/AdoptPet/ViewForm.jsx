import { useEffect } from "react";
import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useParams } from "react-router-dom";

const ViewForm = () => {



    const { adoptionForms, dispatch } = useAdoptionContext();
    const params = useParams(); // Get the ID parameter from the URL
    const id = params.id;

    useEffect(() => {

        const fetchData = async () => {

            try {
                console.log("ID from URL:", id);
                const response = await fetch('http://localhost:4000/api/adoption/' + id)

                const json = await response.json()

                dispatch({ type: 'SET_FORMS', payload: json })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()
    }, [dispatch])



    return (

        <div className="view-only-adoption-form">

            <p>Name: {adoptionForms.name}</p>
            <p>Age: {adoptionForms.age}</p>
            <p>Species: {adoptionForms.species}</p>
            <p>Breed: {adoptionForms.breed}</p>
            <p>Gender: {adoptionForms.gender}</p>
            {adoptionForms.imageUrl && (
                <div>
                    <h5>Preview:</h5>
                    <img src={adoptionForms.imageUrl} alt="Pet" style={{ width: "100px", height: "100px" }} />
                </div>
            )}
            <p>Owner Contact: {adoptionForms.ownerContact}</p>
            <p>Activity Level: {adoptionForms.description?.activityLevel || 'Not specified'}</p>
            <p>Special Needs: {adoptionForms.description?.specialNeeds || 'None'}</p>
        </div>


    )

}

export default ViewForm