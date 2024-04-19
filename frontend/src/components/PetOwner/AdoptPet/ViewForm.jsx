import { useEffect } from "react";
import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useParams } from "react-router-dom";
import './styles.css'

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

        <div className="view-listing-page">
            <div className="listing">
                <div className="adoption-image">
                    {adoptionForms.imageUrl && (
                        <img src={adoptionForms.imageUrl} alt="Pet" />
                    )}
                </div>
                <div className="pet-details">
                    <h1>Meet {adoptionForms.name}</h1>
                    <div className="pet-about">
                        <p>Age: {adoptionForms.age}</p>
                        <p>Species: {adoptionForms.species}</p>
                        <p>Breed: {adoptionForms.breed}</p>
                        <p>Gender: {adoptionForms.gender}</p>
                        <div className="special-description">
                            <p>Activity Level: {adoptionForms.description?.activityLevel || 'Not specified'}</p>
                            <p>Special Needs: {adoptionForms.description?.specialNeeds || 'None'}</p>
                        </div>
                    </div>
                    <p className="owner-contact">You can contact the owner: {adoptionForms.ownerContact}</p>
                </div>
            </div>
        </div>


    )

}

export default ViewForm