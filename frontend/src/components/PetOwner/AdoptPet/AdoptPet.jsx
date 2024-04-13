import { useEffect } from "react"
import { useAdoptionContext } from "../../../hooks/useAdoptionContext"
import { useNavigate } from "react-router-dom"
import image1 from './images/image1.png'
import './styles.css'

const AdoptPet = ({ navBarProps }) => {
    const navigate = useNavigate();

    navBarProps("#FFF", "#E2929D")

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

            <div className="landing-image">
                <img src={image1} alt="" />
                <div className="image-text-1">Don’t Buy, Adopt!</div>
                <div className="image-text-2">Find your purr-fect match at
                    Pawpulz Adoption Center! Our cuddly companions are
                    waiting to steal your heart and fill your home with endless love and joy.</div>
            </div>
            <div className="listing-welcome-text">Meet the good-est Girls and Boys
                waiting for their forever homes</div>
            <div className="section-1">

                <div className="listings">
                    {adoptionForms && Array.isArray(adoptionForms) && adoptionForms
                        .filter(adoptionForm => adoptionForm.approved === 'Approved') // Filter out forms that are not approved
                        .map((adoptionForm, index) => (
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

            </div>

            <div className="add-newFrom">
                <div className="New-Form-Text-container">
                    <p >Give your beloved pet the chance to find a loving forever home</p>
                    <p>Your pet's story matters, and together, we can help them embark on a new journey filled with love and care.</p>
                </div>
                <button className="adoptPetButton" onClick={handleNewAdoptionClick}>Find A New Home for Your Pet</button>
            </div>
        </div>

    );
}

export default AdoptPet;