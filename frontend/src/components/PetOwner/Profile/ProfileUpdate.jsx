import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileUpdate = () => {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inputsValid, setInputsValid] = useState(false)


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
                const response = await fetch("http://localhost:4000/api/petOwner/getUserDetailsFromToken", config)
                const json = await response.json()
                
                if(!response.ok){
                    setLoading(false)
                    throw Error("Invalid Token")
                }
                setError("")
                setName(json.username)
                setEmail(json.email)
                setLoading(false)

            } catch (error){
                setLoading(false)
                setError(error.message)
            }
        }
        
        fetchProfileData()

    }, [])

    // useEffect(()=> {
    //     if(name.length != 0 && email.length != 0){
    //         setInputsValid(true)
    //     } else {
    //         setInputsValid(false)
    //     }
    // }, [name, email, password])

    return ( 
        <>
            {!loading && (
                <form className="profileUpdateForm">
                    {error}
                    <div className="profileUpdateInputWrapper">
                        <label htmlFor="name">Username : </label>
                        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} name="name" id="name" />
                    </div>
                    <div className="profileUpdateInputWrapper">
                        <label htmlFor="email">Email : </label>
                        <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" id="email" />
                    </div>
                    <div className="profileUpdateInputWrapper">
                        <label htmlFor="password">Password : </label>
                        <input type="password" value={password} placeholder="Leave empty if password doesn't need to be changed" onChange={(e) => {setPassword(e.target.value)}} name="password" id="password" />
                    </div>
                    <div className="profileUpdateSubmitButton">
                        {inputsValid && (<button type="submit">Update Profile</button>)}
                        {!inputsValid && (<button disabled>Update Profile</button>)}
                    </div>
                </form>
            )}
        </>
     );
}
 
export default ProfileUpdate;