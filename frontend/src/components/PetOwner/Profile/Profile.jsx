import { useUserContext } from '../../../hooks/userContextHook';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePetContext } from '../../../hooks/usePetContext';
import PetComponent from './PetComponent';

import './styles.css'

const Profile = ({ setNavBarBackgroundColor, setNavBarColor}) => {

    setNavBarBackgroundColor("#E2929D")
    setNavBarColor("#FFF")
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const {user, dispatch: userDispatch} = useUserContext()
    const {pets, dispatch: petDispatch} = usePetContext()

    useEffect(() => {
        if(!user){
            navigate('/pet/login')
        }
        const fetchProfileData = async () => {
            
            const config = {
                headers: {
                    "authorization": `Bearer ${user.userToken}`
                }
            }

            try{
                const userDetailsResponse = await fetch("http://localhost:4000/api/petOwner/getUserDetailsFromToken", config)

                if(!userDetailsResponse.ok){
                    setError("Invalid Token")
                }

                const userDetailsJson = await userDetailsResponse.json()
                setProfileData(userDetailsJson)
                setLoading(false)

            } catch (error){
                console.log("profile page error", error)
            }
        }
        
        if (user){
            fetchProfileData()
        }

    }, [user])


    const logOutUser = () => {
        navigate('/pet/home')
        localStorage.removeItem('user')
        userDispatch({type:"LOGOUT"})
    }

    return ( 
        <>
            <div className="profilePage">
                <div className="userDetails">
                    <p className='username'>Welcome <span>{!loading && profileData.username}</span></p>
                    <p className='email'><span>{!loading && profileData.email}</span></p>
                    <div className="actionButtons">
                        <button onClick={() => navigate('/pet/profile/update')}>Update</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
                <div className="logOutButton">
                    <button onClick={logOutUser}>Log Out</button>
                </div>
                <div className="petDetails">
                    <div className="petDetailsTitle">Pet Details</div>
                    <hr />
                    <div className="petDetailsCards">
                        {!loading && pets.map( pet => (
                                <PetComponent pet={pet} />
                        ))}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Profile;