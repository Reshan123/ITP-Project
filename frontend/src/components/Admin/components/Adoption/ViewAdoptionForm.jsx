
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

        <div className="adoption-listings-admin">

            <p>Name: {adoptionForms.name}</p>
            <p>Age: {adoptionForms.age}</p>
            <p>Species: {adoptionForms.species}</p>
            <p>Breed: {adoptionForms.breed}</p>
            <p>Gender: {adoptionForms.gender}</p>
            {adoptionForms.imageUrl && (
                <div className="image-container">

                    <img src={adoptionForms.imageUrl} alt="Pet" />
                </div>
            )}
            <p>Owner Contact: {adoptionForms.ownerContact}</p>
            <p>Activity Level: {adoptionForms.description?.activityLevel || 'Not specified'}</p>
            <p>Special Needs: {adoptionForms.description?.specialNeeds || 'None'}</p>
            <button onClick={() => handleApproval('Approved')}>Approve</button>
            <button onClick={() => handleApproval('Rejected')}>Reject</button>
        </div>

    )
}

export default ViewAdoptionForm