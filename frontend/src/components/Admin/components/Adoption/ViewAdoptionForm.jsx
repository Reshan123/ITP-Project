
import { useEffect } from "react";
import { useState } from "react";
import { useAdoptionContext } from "../../../../hooks/useAdoptionContext";
import { useParams, useNavigate } from "react-router-dom";

const ViewAdoptionForm = () => {

    const { adoptionForms, dispatch } = useAdoptionContext();
    const params = useParams(); // Get the ID parameter from the URL
    const id = params.id;
    const navigate = useNavigate()
    const [approvalStatus, setApprovalStatus] = useState(adoptionForms.approved);

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

    // Function to handle approval/rejection
    const handleApproval = async (status) => {

        const confirmation = window.confirm(`Are you sure you want to ${status === 'approved' ? 'approve' : 'reject'} this adoption form?`);
        if (!confirmation) return;
        try {
            const response = await fetch(`http://localhost:4000/api/adoption/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ approved: status })
            });
            const json = await response.json();
            setApprovalStatus(status);
            if (response.ok) {

                navigate('/admin/home/adoption-forms')
            }
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    return (
        <div className="adoption-admin-form-page">
            <div class="adoption-listings-admin">
                <div class="image-container">
                    {adoptionForms.imageUrl && (
                        <img src={adoptionForms.imageUrl} alt="Pet" />
                    )}
                </div>
                <div class="details">
                    <div class="details-container">
                        <div className="set">
                            <p><strong>Name:</strong> {adoptionForms.name}</p>
                            <p><strong>Age:</strong> {adoptionForms.age}</p>
                        </div>
                        <div className="set">
                            <p><strong>Species:</strong> {adoptionForms.species}</p>
                            <p><strong>Breed:</strong> {adoptionForms.breed}</p>
                        </div>
                        <p><strong>Gender:</strong> {adoptionForms.gender}</p>
                        <p><strong>Owner Contact:</strong> {adoptionForms.ownerContact}</p>
                        <p><strong>Activity Level:</strong> {adoptionForms?.activityLevel || 'Not specified'}</p>
                        <p><strong>Description:</strong> {adoptionForms?.smallDescription || 'Not specified'}</p>
                        <p><strong>Special Needs:</strong> {adoptionForms?.specialNeeds || 'None'}</p>

                    </div>
                    <div className="buttons">
                        <button onClick={() => handleApproval('Approved')}>Approve</button>
                        <button onClick={() => handleApproval('Rejected')}>Reject</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ViewAdoptionForm