import { useUserContext } from '../../../hooks/userContextHook';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { usePetContext } from '../../../hooks/usePetContext';
import { useBookingContext } from '../../../hooks/useBookingContext';
import PetComponent from './PetComponent';
import BookingDetails from '../Booking/BookingDetails'
import '../Booking/styles.css'
import { Pagination } from 'antd';
import { Modal, Button } from 'antd';


import './styles.css'
import { useEffect, useState } from 'react';
import { useAdoptionContext } from '../../../hooks/useAdoptionContext';
import { useLostPetsContext } from '../../../hooks/useLostPetsContext';
//import LostPetDetails from '../LostPet/LostPetDetails';
import LostPetProfileDetails from '../LostPet/LostPetProfileDetails';
import { useAdoptionRequestContext } from '../../../hooks/useAdoptionRequestContext';
//import '../LostPet/styles.css'

const Profile = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF", "#B799D1")

    const navigate = useNavigate()

    const { user, dispatch: userDispatch } = useUserContext()
    const { pets, dispatch: petDispatch } = usePetContext()
    const { bookings, dispatch: bookingDispatch } = useBookingContext()

    const { adoptionForms, dispatch } = useAdoptionContext();
    const { lostNotice, dispatch: lostDispatch } = useLostPetsContext()
    const { requestForms, dispatch: applicationDispatch } = useAdoptionRequestContext();
    const [visible, setVisible] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);


    const handleViewForm = (form) => {
        setSelectedForm(form);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };



    //booking pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentBookings = bookings ? bookings.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

    useEffect(() => {

        const fetchBookings = async () => {

            const config = {
                headers: {
                    'authorization': `Bearer ${user.userToken}`
                }
            }

            try {
                const response = await fetch("http://localhost:4000/api/bookings/getOwner", config)

                if (!response.ok) {
                    throw Error(response.message)
                }

                const json = await response.json()

                bookingDispatch({ type: 'SET_BOOKINGS', payload: json.message })

            } catch (error) {

                console.log("pet owner page error", error)
            }
        }

        if (user) {
            fetchBookings()
        }
    }, [user])

    //lostPets 
    useEffect(() => {

        const fetchLostPetNotices = async () => {
            const option = {

                headers: {
                    'authorization': `Bearer ${user.userToken}`
                }
            }

            try {
                const response = await fetch("http://localhost:4000/api/lostPetNotice/getUser/", option)

                if (!response.ok) {
                    throw Error(response.message)
                }

                const json = await response.json()

                lostDispatch({ type: 'SET_LOSTPETNOTICE', payload: json.message })


            } catch (error) {
                console.log('Coudnt find the id of the user relavant to the post', error)
            }
        }
        if (user) {
            fetchLostPetNotices()
        }
    }, [user])


    const logOutUser = () => {
        localStorage.removeItem('user')
        userDispatch({ type: "LOGOUT" })
        navigate('/pet/home')
    }

    const deleteProfile = async () => {
        const deleteApproval = confirm("Are you sure you want to delete profile?")
        if (deleteApproval) {
            try {
                const config = {
                    method: 'DELETE',
                    headers: {
                        'authorization': `Bearer ${user.userToken}`
                    }
                }
                const userDeleteResponse = await fetch("http://localhost:4000/api/petOwner/deleteUserDetailsFromToken", config)
                const userJson = await userDeleteResponse.json()
                if (!userDeleteResponse.ok) {
                    throw Error(userJson.message)
                }

                navigate('/pet/home')
                localStorage.removeItem('user')
                userDispatch({ type: "LOGOUT" })

            } catch (error) {
                console.log(error.message)
            }
        }
    }

    //Pet adoption section
    useEffect(() => {

        const config = {

            headers: {
                'authorization': `Bearer ${user?.userToken ?? ''}`

            }
        }

        const fetchForms = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/adoption/getUSER', config);
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_FORMS', payload: json });
                    console.log('Adoption forms fetched successfully:', json);
                } else {
                    console.log('Failed to fetch adoption forms:', json);
                }
            } catch (error) {
                console.error('Error fetching adoption forms:', error);
            }
        };

        if (user) { fetchForms() }

    }, [user])



    const handleView = (id) => {
        navigate('/pet/profile/adoption-form-update/' + id);
    };



    //getallrequestforms
    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('http://localhost:4000/api/adoptionRequest/getall')
            const json = await response.json()

            if (response.ok) {
                applicationDispatch({ type: 'SET_FORMS', payload: json })
            }
        }
        fetchForms()
    }, [applicationDispatch])

    //getting userID
    const getUserIDFromToken = () => {
        // Assuming user.userToken contains the JWT token
        const token = user && user.userToken;

        if (!token) {
            console.error("Token is missing");
            return null;
        }

        // Split the token by periods to get the payload part
        const tokenParts = token.split('.');

        if (tokenParts.length !== 3) {
            console.error("Invalid token format");
            return null;
        }

        // The payload is the second part
        const payload = JSON.parse(atob(tokenParts[1]));

        if (!payload._id) {
            console.error("User ID not found in token");
            console.log("Payload:", payload); // Log the payload to inspect its structure
            return null;
        }

        // Extract the userID from the payload
        return payload._id;
    };


    const userID = getUserIDFromToken(); // Get the current user's ID from the token
    console.log("UserID:", userID);

    const matchingRequestForms = requestForms && requestForms.length > 0
        ? requestForms.filter(requestForm => userID === requestForm.userID)
        : [];

    console.log("Matching Request Forms:", matchingRequestForms);


    const [approvalStatus, setStatus] = useState(requestForms ? requestForms.status : null);

    const [adoptionStatus, setAdoptionStatus] = useState(adoptionForms ? adoptionForms.adoptionStatus : null);



    const handleApproval = async (id, status, adoptionStatus, adoptionFormID) => {
        const confirmation = window.confirm(`Are you sure you want to ${status === 'Approved' ? 'approve' : 'reject'} this adoption form?`);
        if (!confirmation) return;
        try {
            const response = await fetch(`http://localhost:4000/api/adoptionRequest/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: status })
            });
            const json = await response.json();
            if (response.ok) {
                setStatus(status); // Update the status state variable
            }

            const res = await fetch(`http://localhost:4000/api/adoption/${adoptionFormID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ adoptionStatus: adoptionStatus })
            });
            const json1 = await res.json();
            if (res.ok) {
                setAdoptionStatus(adoptionStatus);
                handleCancel();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };




    const handleRequestDelete = async (id) => {
        const response = await fetch('http://localhost:4000/api/adoptionRequest/' + id, {
            method: 'DELETE'
        })
        const confirmed = window.confirm("Are you sure you want to delete this form?");

        if (!confirmed) {
            return; // If not confirmed, return without submitting
        }
        const json = await response.json()

        if (response.ok) {
            applicationDispatch({ type: 'DELETE_FORM', payload: json })
            console.log('Deleted sucessfully')
        }
    }


    return (
        <>
            <div className="profilePage">
                <div className="userDetails">
                    <p className='username'>Welcome <span>{user && user.username}</span></p>
                    <p className='email'><span>{user && user.email}</span></p>
                    <div className="actionButtons">
                        <button onClick={() => navigate('/pet/profile/update')}>Update</button>
                        <button className='delete' onClick={deleteProfile}>Delete</button>
                    </div>
                </div>
                <div className="logOutButton">
                    <button onClick={logOutUser}>Log Out</button>
                </div>

                {/* pet details */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Pet Details</div>
                        <button className='detailsSectionAddButton' onClick={() => navigate('/pet/profile/addpet')}>Add Pets</button>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        {pets && pets.map(pet => (
                            <PetComponent pet={pet} key={pet._id} />
                        ))}
                    </div>
                </div>
                {/* appointments */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Appointment Details</div>
                        <HashLink to="/pet/home/#bookAppointments" ><button className='detailsSectionAddButton'>Add Appointments</button></HashLink>
                    </div >
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Pagination
                            current={currentPage}
                            total={bookings ? bookings.length : 0} // Ensure bookings is not null before getting length
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                    <div className="detailsSectionCardContainer">
                        <div className='bookings'>
                            <div className='booked-appointments'>
                                {currentBookings && currentBookings.map(booking => (
                                    <BookingDetails key={booking._id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div >


                {/* adoption listings */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Adoption Listings</div>
                        <button className='detailsSectionAddButton' onClick={() => { window.scrollTo(0, 0); navigate('/pet/adopt/adoptionForm') }}>Add Listing</button>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">

                        {adoptionForms && adoptionForms.length > 0 ? (
                            adoptionForms.map(adoptionForm => (
                                // Check if adoptionStatus is 'Pending'
                                adoptionForm.adoptionStatus === 'Pending' && (
                                    <div className="adoption-form-preview" key={adoptionForm._id}>
                                        <img src={adoptionForm.imageUrl || ''} alt="Pet" className="pet-image" />
                                        <div className="details">
                                            <h4>{adoptionForm.name}</h4>
                                        </div>
                                        <h3
                                            className='approval-status'
                                            style={{
                                                color: adoptionForm.approved === 'Approved' ? 'green' : 'red',
                                                padding: '8px 16px',
                                                borderRadius: '4px',
                                                backgroundColor: 'white',
                                                height: '40px'
                                            }}
                                        >
                                            {adoptionForm.approved}
                                        </h3>

                                        <button className='viewbtn1' onClick={() => handleView(adoptionForm._id)}>View Listing</button>
                                    </div>
                                )
                            ))
                        ) : (
                            <div>No forms added</div>
                        )}

                    </div>
                </div>


                {/*adoptionRequest*/}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Adoption Applications</div>

                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">

                        <div className="request-formss">
                            {matchingRequestForms && matchingRequestForms.length > 0 ? (
                                matchingRequestForms.map(form => (
                                    <div className="request-forms" key={form._id}>

                                        <p>Name: {form.petName}</p>
                                        <p>Contact Name: {form.contactName}</p>
                                        <p>Status: {form.status}</p>
                                        <span onClick={() => handleRequestDelete(form._id)}>Delete</span>
                                        <button className='view-btn1' onClick={() => handleViewForm(form)}>View Form</button>


                                    </div>
                                ))
                            ) : (
                                <p>No adoption requests found</p>
                            )}

                            <Modal
                                title="Request Form Details"
                                visible={visible}
                                onCancel={handleCancel}
                                // footer={[
                                //     <Button key="update" type="primary" onClick={() => navigate(`/pet/requestform/${selectedForm._id}`)}>
                                //         Update
                                //     </Button>]}
                                footer={null}
                                className="custom-modal"
                            >
                                {selectedForm && (
                                    <div>
                                        <p> <strong>Contact Name:</strong> {selectedForm.contactName}</p>
                                        <p><strong>Pet Name:</strong> {selectedForm.petName}</p>
                                        <p><strong>Contact Email:</strong>  {selectedForm.contactEmail}</p>
                                        <p><strong>Contact Phone:</strong>  {selectedForm.contactPhone}</p>
                                        <p><strong>Residence Type: </strong> {selectedForm.residenceType}</p>
                                        <p><strong>Residence Details:</strong>  {selectedForm.residenceDetails}</p>
                                        <p><strong>Current Pets: </strong> {selectedForm.currentPets ? 'Yes' : 'No'}</p>
                                        <p><strong>Current Pets Details: </strong> {selectedForm.currentPetsDetails}</p>
                                        <p><strong>Reason for Adoption:</strong>  {selectedForm.reasonForAdoption}</p>
                                    </div>
                                )}
                            </Modal>
                        </div>

                    </div>


                </div>

                {/*Applications for a pet*/}
                {/*adoptionRequest*/}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">Adoption Requests For My Pets</div>

                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        <div className="applied-forms">
                            {adoptionForms && adoptionForms.length > 0 ? (
                                adoptionForms.map(adoptionForm => {
                                    // Filter request forms for the current adoption form
                                    const matchingRequestForms = requestForms ? requestForms.filter(form => form.adoptionFormID === adoptionForm._id) : [];


                                    return (
                                        <div key={adoptionForm._id}>
                                            {matchingRequestForms.map(requestForm => (
                                                <div className="request-forms" key={requestForm._id}>
                                                    <p>Name: {requestForm.petName}</p>
                                                    <p>Contact Name: {requestForm.contactName}</p>
                                                    <p>Status: {requestForm.status}</p>


                                                    <button className='view-btn1' onClick={() => handleViewForm(requestForm)}>View Form</button>

                                                    <Modal
                                                        title="Request Form Details"
                                                        visible={visible && selectedForm === requestForm}
                                                        onCancel={handleCancel}
                                                        footer={null}
                                                        className="custom-modal2"
                                                    >
                                                        {selectedForm && (
                                                            <div>
                                                                <p><strong>Contact Name:</strong>  {selectedForm.contactName}</p>
                                                                <p><strong>Pet Name:</strong> {selectedForm.petName}</p>
                                                                <p><strong>Contact Email:</strong> {selectedForm.contactEmail}</p>
                                                                <p><strong>Contact Phone: </strong>{selectedForm.contactPhone}</p>
                                                                <p><strong>Residence Type: </strong>{selectedForm.residenceType}</p>
                                                                <p><strong>Residence Details: </strong>{selectedForm.residenceDetails}</p>
                                                                <p><strong>Current Pets: </strong>{selectedForm.currentPets}</p>
                                                                <p><strong>Current Pets Details: </strong>{selectedForm.currentPetsDetails}</p>
                                                                <p><strong>Reason for Adoption:</strong> {selectedForm.reasonForAdoption}</p>
                                                            </div>
                                                        )}
                                                        <div className="action-buttons">
                                                            <Button onClick={() => handleApproval(selectedForm._id, 'Approved', 'Adopted', selectedForm.adoptionFormID)} type='primary'>Approve</Button>
                                                            <Button onClick={() => handleApproval(selectedForm._id, 'Rejected', 'Pending', selectedForm.adoptionFormID)} type='primary'>Reject</Button>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No adoption forms found</p>
                            )}
                        </div>
                    </div>


                </div>


                {/* lost pet */}
                < div className="detailsSection" >
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Lost Pet Notices</div>
                        <button className='detailsSectionAddButton' onClick={() => { window.scrollTo(0, 0); navigate('/pet/lostpetnotices/lostpetform') }}>Add Notice</button>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        {/* add the map to show listings */}
                        <div className="container1">
                            {/*mapping thought the notices only if ther are notices*/}
                            {lostNotice && lostNotice.map((notice) => (
                                <LostPetProfileDetails key={notice._id} notice={notice} />
                            ))}
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Profile;