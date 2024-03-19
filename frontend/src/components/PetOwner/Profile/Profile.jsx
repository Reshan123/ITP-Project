import { useUserContext } from '../../../hooks/userContextHook';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {

    const navigate = useNavigate()

    const [profileData, setProfileData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const {user ,dispatch} = useUserContext()

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/pet/login')
        }
        const fetchProfileData = async () => {
            
            const config = {
                headers: {
                    "authorization": `Bearer ${user.userToken}`
                }
            }

            try{
                const response = await fetch("http://localhost:4000/api/petOwner/getUserDetailsFromToken", config)

                if(!response.ok){
                    setError("Invalid Token")
                }
                const json = await response.json()
                setProfileData(json)
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
        dispatch({type:"LOGOUT"})
    }

    return ( 
        <>
            {error}
            Username : {!loading && profileData.username}
            <br />
            Email : {!loading && profileData.email}
            <br />
            <button onClick={() => navigate('/pet/profile/update')}>Update</button>
            <button>Delete</button>
            <br />
            <br />
            <br />
            <button className='logOutButton' onClick={logOutUser}>Log Out</button>
        </>
     );
}
 
export default Profile;