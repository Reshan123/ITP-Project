import { useAdoptionContext } from "../../../../hooks/useAdoptionContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllForms = () => {


    const { adoptionForms, dispatch } = useAdoptionContext();

    const navigate = useNavigate()

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

    const handleViewDetails = (id) => {
        navigate(`/admin/home/adoption-forms/view-form/${id}`);
    };
    // Check if adoptionForms is an array
    if (!Array.isArray(adoptionForms)) {
        return <p>No adoption forms available.</p>;
    }

    // Iterate over adoptionForms using forEach
    const formPreviews = [];
    adoptionForms.forEach(adoptionForm => {
        formPreviews.push(
            <div key={adoptionForm._id} className="adoption-form-preview">
                <img src={adoptionForm.imageUrl || ''} alt="Pet" className="pet-image" />
                <h4>{adoptionForm.name}</h4>
                <div className="details">
                    <p><strong>Gender: </strong>{adoptionForm.gender}</p>
                    <p><strong>Breed: </strong>{adoptionForm.breed}</p>
                </div>
                <button onClick={() => handleViewDetails(adoptionForm._id)}>View Details</button>
            </div>
        );
    });

    return (
        <div className="AdoptionFormPage">
            <div className="listings">
                {formPreviews}
            </div>
        </div>
    );
}

export default AllForms