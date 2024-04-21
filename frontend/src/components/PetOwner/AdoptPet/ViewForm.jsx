import { useEffect, useState } from "react";
import { useAdoptionContext } from "../../../hooks/useAdoptionContext";
import { useParams } from "react-router-dom";
import './styles.css'
import cat from './images/cat.png'
import dog from './images/dog.png'

const ViewForm = () => {

    // State to control whether to show owner contact or "Get In Touch"
    const [showOwnerContact, setShowOwnerContact] = useState(false);

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
                    {adoptionForms && adoptionForms.imageUrl && (
                        <img src={adoptionForms.imageUrl} alt="Pet" />
                    )}
                </div>
                <div className="pet-details">
                    <h1>Meet {adoptionForms && adoptionForms.name}</h1>
                    <div className="pet_about_1">
                        <div className="species" style={{ backgroundColor: adoptionForms?.species === 'Dog' ? 'rgba(139, 69, 19, 0.6)' : (adoptionForms?.species === 'Cat' ? 'rgba(128, 128, 128, 0.6)' : 'transparent') }}>

                            {adoptionForms?.species === 'Dog' && <img src={dog} alt="Dog" />}
                            {adoptionForms?.species === 'Cat' && <img src={cat} alt="Cat" />}
                            {adoptionForms?.species !== 'Dog' && adoptionForms?.species !== 'Cat' && (
                                <p > {adoptionForms?.species}</p>
                            )}

                        </div>
                        <div className="gender">
                            <p> {adoptionForms && adoptionForms.gender}</p>
                        </div>
                    </div>
                    <div className="pet-about_2">
                        <p><strong>Age: </strong> {adoptionForms && adoptionForms.age}</p>

                        <p><strong>Breed:</strong>  {adoptionForms && adoptionForms.breed}</p>
                        <div className="pet_description">
                            <strong>About {adoptionForms.name} </strong><br />
                            <p>{adoptionForms?.description?.smallDescription}</p>
                        </div>
                        <div className="special-description">
                            <p><strong>Activity Level:</strong> {adoptionForms?.description?.activityLevel || 'Not specified'}</p>
                            <p><strong>Special Needs:</strong>  {adoptionForms?.description?.specialNeeds || 'None'}</p>
                        </div>
                    </div>
                    <div className="contact_details">
                        {showOwnerContact ? (
                            <p className="owner-contact"><strong>Owner Contact:</strong>{adoptionForms?.ownerContact}</p>
                        ) : (
                            <button className="get-in-touch-button" onClick={() => setShowOwnerContact(true)}>
                                Get In Touch
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewForm;
