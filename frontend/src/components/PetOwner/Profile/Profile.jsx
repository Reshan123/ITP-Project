import { useUserContext } from '../../../hooks/userContextHook';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePetContext } from '../../../hooks/usePetContext';

const Profile = () => {

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
            {!loading && pets.map( pet => (
                <>
                    {pet.petName}
                    <br />
                    {pet.petGender}
                    <br />
                    {pet.petAge}
                    <br />
                    {pet.petSpecies}
                    <br />
                    {pet.petBreed}
                    <br /><br />
                </>
            ))}
            <br />
            <br />
            <br />
            <br />
            <button className='logOutButton' onClick={logOutUser}>Log Out</button>
        </>
     );
}
 
export default Profile;