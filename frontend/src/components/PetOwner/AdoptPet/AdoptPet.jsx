import { useEffect } from "react"
import { useAdoptionContext } from "../../../hooks/useAdoptionContext"
import { useNavigate } from "react-router-dom"
import './styles.css'

const AdoptPet = ({ setNavBarBackgroundColor, setNavBarColor }) => {
    const navigate = useNavigate();

    setNavBarBackgroundColor("#FFF")
    setNavBarColor("#E2929D")

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

    const handleUpdateClick = () => {
        navigate('/pet/adopt/adoptionForm');
    };

    return (
        <div className="AdoptionFormPage">
            <div className="listings">
                {adoptionForms && adoptionForms.map(adoptionForm => (
                    <div key={adoptionForm._id} className="adoption-form-preview">
                        <img src={adoptionForm.imageUrl || ''} alt="Pet" className="pet-image" />
                        <h4>{adoptionForm.name}</h4>
                        <div className="details">
                            <p><strong>Gender: </strong>{adoptionForm.gender}</p>
                            <p><strong>Breed: </strong>{adoptionForm.breed}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={handleUpdateClick}>Find A New Home for Your Pet</button>
            </div>
        </div>

    );
}

export default AdoptPet;