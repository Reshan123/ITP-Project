import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../hooks/userContextHook";

const ProfileUpdate = () => {
    
    const { user, dispatch: userDispatch} = useUserContext()
    const navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inputsValid, setInputsValid] = useState(false)
    const [error, setError] = useState("")

    useEffect(()=>{
        if (user){
            setName(user.username)
            setEmail(user.email)
        }
    }, [user])

    useEffect(()=> {
        if(name.length != 0 && email.length != 0){
            setInputsValid(true)
        } else {
            setInputsValid(false)
        }
    }, [name, email, password])

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            if (password){
                const config = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${user.userToken}`
                    },
                    body: JSON.stringify({ 
                        name,
                        email,
                        password
                    })
                }
                const response = await fetch("http://localhost:4000/api/petOwner/updateUserDetailsFromToken", config);
                const json = await response.json()

                if(!response.ok){
                    throw Error(json.message)
                }

                userDispatch({type:"UPDATE", payload:{username:name,email}})
                const userLS = {username:name, email, userToken:user.userToken}
                localStorage.setItem('user',JSON.stringify(userLS))
                navigate('/pet/profile')
                setError("")
                // console.log(json)

                
            } else {
                const config = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${user.userToken}`
                    },
                    body: JSON.stringify({ 
                        name,
                        email
                    })
                }
                const response = await fetch("http://localhost:4000/api/petOwner/updateUserDetailsFromToken", config);
                const json = await response.json()
                
                if(!response.ok){
                    throw Error(json.message)
                }

                userDispatch({type:"UPDATE", payload:{username:name,email}})
                const userLS = {username:name, email, userToken:user.userToken}
                localStorage.setItem('user',JSON.stringify(userLS))
                navigate('/pet/profile')
                setError("")
                // console.log(json)

            }

        } catch (error){
            setError(error.message)
        }
    }

    return ( 
        <>
            <form className="profileUpdateForm">
                {error}
                <div className="profileUpdateInputWrapper">
                    <label htmlFor="name">Username : </label>
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} name="name" id="name" />
                </div>
                <div className="profileUpdateInputWrapper">
                    <label htmlFor="email">Email : </label>
                    <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" id="email" />
                </div>
                <div className="profileUpdateInputWrapper">
                    <label htmlFor="password">Password : </label>
                    <input type="password" value={password} placeholder="Leave empty if password doesn't need to be changed" onChange={(e) => {setPassword(e.target.value)}} name="password" id="password" />
                </div>
                <div className="profileUpdateSubmitButton">
                    {inputsValid && (<button type="submit" onClick={updateProfile}>Update Profile</button>)}
                    {!inputsValid && (<button disabled>Update Profile</button>)}
                </div>
            </form>
        </>
     );
}
 
export default ProfileUpdate;