import { useEffect } from "react"
import { useAdoptionContext } from "../../../hooks/useAdoptionContext"
import { useNavigate } from "react-router-dom"
import './styles.css'

const AdoptPet = ({ navBarProps }) => {
    const navigate = useNavigate();

    navBarProps("#FFF", "#E2929D", "#E2929D")

    const { adoptionForms, dispatch } = useAdoptionContext();

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('http://localhost:4000/api/adoption')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_FORMS', payload: json })
            }
        }
        fetchForms()
    }, [dispatch])

    const handleNewAdoptionClick = () => {
        navigate('/pet/adopt/adoptionForm');
    };

    const handleViewDetails = (id) => {
        navigate(('/pet/adopt/form-details/' + id))
    }

    return (
        <div className="AdoptionFormPage">
            <div className="listings">
                {adoptionForms && adoptionForms.map((adoptionForm, index) => (
                    <article key={index} className="card">
                        <img
                            className="card__background"
                            src={adoptionForm.imageUrl || ''}
                            alt="Pet"
                            width="1920"
                            height="2193"
                        />
                        <div className="card__content | flow">
                            <div className="card__content--container | flow">
                                <h2 className="card__title">{adoptionForm.name}</h2>
                                <p className="card__description">
                                    <strong>Gender: </strong>{adoptionForm.gender}<br />
                                    <strong>Breed: </strong>{adoptionForm.breed}
                                </p>
                            </div>
                            <button className="card__button" onClick={() => handleViewDetails(adoptionForm._id)}>View Details</button>
                        </div>
                    </article>
                ))}
            </div>


            <div>
                <button className="adoptPetButton" onClick={handleNewAdoptionClick}>Find A New Home for Your Pet</button>
            </div>
        </div>

    );
}

export default AdoptPet;