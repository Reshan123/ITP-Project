import { useUserContext } from '../../../hooks/userContextHook';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { usePetContext } from '../../../hooks/usePetContext';
import { useBookingContext } from '../../../hooks/useBookingContext';
import PetComponent from './PetComponent';
import BookingDetails from '../Booking/BookingDetails'
import '../Booking/styles.css'
import { Pagination } from 'antd';

import './styles.css'
import { useEffect, useState } from 'react';
import { useAdoptionContext } from '../../../hooks/useAdoptionContext';
import { useLostPetsContext } from '../../../hooks/useLostPetsContext';
//import LostPetDetails from '../LostPet/LostPetDetails';
import LostPetProfileDetails from '../LostPet/LostPetProfileDetails';
//import '../LostPet/styles.css'

const Profile = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF")

    const navigate = useNavigate()

    const { user, dispatch: userDispatch } = useUserContext()
    const { pets, dispatch: petDispatch } = usePetContext()
    const { bookings, dispatch: bookingDispatch } = useBookingContext()

    const { adoptionForms, dispatch } = useAdoptionContext();
    const { lostNotice, dispatch: lostDispatch } = useLostPetsContext()

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
                'authorization': `Bearer ${user.userToken}`
            }
        }

        const fetchForms = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/adoption/getUSER', config);
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_FORMS', payload: json });
                    console.log('Adoption forms fetched successfully:', json); // Add this console log
                } else {
                    console.log('Failed to fetch adoption forms:', json); // Log error message
                }
            } catch (error) {
                console.error('Error fetching adoption forms:', error); // Log fetch error
            }
        };

        if (user) { fetchForms() }

    }, [user])



    const handleView = (id) => {
        navigate('/pet/profile/adoption-form-update/' + id);
    };
    //
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
                                <div className="adoption-form-preview" key={adoptionForm._id}>
                                    <img src={adoptionForm.imageUrl || ''} alt="Pet" className="pet-image" />
                                    <div className="details">
                                        <h4>{adoptionForm.name}</h4>
                                    </div>
                                    <button className='viewbtn1' onClick={() => handleView(adoptionForm._id)}>View Listing</button>
                                </div>
                            ))
                        ) : (
                            <div>No forms added</div>
                        )}
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