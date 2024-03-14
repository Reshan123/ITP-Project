import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {

    const navigate = useNavigate()

    

    const [profileData, setProfileData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!localStorage.user){
            navigate('/login')
        }
        const token = JSON.parse(localStorage.getItem('user'))


        const fetchProfileData = async () => {
            
            const config = {
                headers: {
                    "authorization": `Bearer ${token.userToken}`
                }
            }

            try{
                const response = await fetch("http://localhost:4000/petOwner/getUserDetails", config)

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
        
        fetchProfileData()

    }, [])

    return ( 
        <>
            {error}
            Username : {!loading && profileData.username}
            <br />
            Email : {!loading && profileData.email}
        </>
     );
}
 
export default Profile;