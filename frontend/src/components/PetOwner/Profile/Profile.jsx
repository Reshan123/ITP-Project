import { useUserContext } from '../../../hooks/userContextHook';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { usePetContext } from '../../../hooks/usePetContext';
import { useBookingContext } from '../../../hooks/useBookingContext';
import PetComponent from './PetComponent';
import BookingDetails from '../Booking/BookingDetails'
import '../Booking/styles.css'

import './styles.css'
import { useEffect } from 'react';

const Profile = ({ navBarProps }) => {

    navBarProps("#B799D1", "#FFF")
    
    const navigate = useNavigate()

    const {user, dispatch: userDispatch} = useUserContext()
    const {pets, dispatch: petDispatch} = usePetContext()
    const {bookings, dispatch: bookingDispatch } = useBookingContext()

    useEffect(() => {
        if(!user){
            navigate('/pet/login')
        }

        const fetchBookings = async() => {

            const config = {
                headers: {
                    'authorization': `Bearer ${user.userToken}`
                }
            }

            try{
                const response = await fetch("http://localhost:4000/api/bookings/getOwner", config)

                if (!response.ok){
                    throw Error(response.message)
                }

                const json = await response.json()

                bookingDispatch({type:'SET_BOOKINGS', payload:json.message})
                
            } catch (error){
                
                console.log("pet owner page error", error)
            }
        }

        if (user){
            fetchBookings()
        }
    }, [user])

    const logOutUser = () => {
        navigate('/pet/home')
        localStorage.removeItem('user')
        userDispatch({type:"LOGOUT"})
    }

    const deleteProfile = async () => {
        const deleteApproval = confirm("Are you sure you want to delete profile?")
        if (deleteApproval){
            try{
                const config = {
                    method: 'DELETE',
                    headers: {
                        'authorization': `Bearer ${user.userToken}`
                    }
                }
                const userDeleteResponse = await fetch("http://localhost:4000/api/petOwner/deleteUserDetailsFromToken", config)
                const userJson = await userDeleteResponse.json()
                if(!userDeleteResponse.ok){
                    throw Error(userJson.message)
                }
    
                navigate('/pet/home')
                localStorage.removeItem('user')
                userDispatch({type:"LOGOUT"})
    
            } catch (error){
                console.log(error.message)
            }
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
                        {pets && pets.map( pet => (
                                <PetComponent pet={pet} key={pet._id} />
                        ))}
                    </div>
                </div>
                {/* appointments */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Appointment Details</div>
                        <HashLink to="/pet/home/#bookAppointments" ><button className='detailsSectionAddButton'>Add Appointments</button></HashLink>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        <div className='bookings'>
                            <div className='booked-appointments'>
                                {bookings && bookings.map(booking => (
                                    <BookingDetails key={booking._id} booking = {booking}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* adoption listings */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Adoption Listings</div>
                        <button className='detailsSectionAddButton' onClick={() => {window.scrollTo(0, 0);navigate('/pet/adopt/adoptionForm')}}>Add Listing</button>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        {/* add the map to show listings */}
                    </div>
                </div>
                {/* lost pet */}
                <div className="detailsSection">
                    <div className="detailsSectionTitleContainer">
                        <div className="detailsSectionTitle">My Lost Pet Notices</div>
                        <button className='detailsSectionAddButton' onClick={() => navigate('')}>Add Notice</button>
                    </div>
                    <hr />
                    <div className="detailsSectionCardContainer">
                        {/* add the map to show listings */}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Profile;