import { useUserContext } from '../../../hooks/userContextHook';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePetContext } from '../../../hooks/usePetContext';
import PetComponent from './PetComponent';

import './styles.css'

const Profile = ({ navBarProps }) => {

    navBarProps("#E2929D", "#FFF")
    
    const navigate = useNavigate()

    const {user, dispatch: userDispatch} = useUserContext()
    const {pets, dispatch: petDispatch} = usePetContext()

    const logOutUser = () => {
        navigate('/pet/home')
        localStorage.removeItem('user')
        userDispatch({type:"LOGOUT"})
    }

    const deleteProfile = async () => {
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
                <div className="petDetails">
                    <div className="petDetailsTitle">Pet Details</div>
                    <hr />
                    <div className="petDetailsCards">
                        {pets && pets.map( pet => (
                                <PetComponent pet={pet} />
                        ))}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Profile;