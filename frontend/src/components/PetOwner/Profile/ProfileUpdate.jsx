import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../../hooks/userContextHook";
import { IoMdArrowRoundBack } from "react-icons/io";
import './styles.css'

const ProfileUpdate = ({navBarProps}) => {

    navBarProps("#B799D1", "#FFF")
    
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
        if(password.length > 0){
            if(password.length >= 8){
                setInputsValid(true)
            } else {
                setInputsValid(false)
            }
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
            <div className="updateProfilePage">
                <div className="backArrow">
                    <IoMdArrowRoundBack onClick={() => {navigate('/pet/profile')}} />
                </div>
                <form className="profileUpdateForm">
                    <div className="updateFormTitle">Update Profile</div>
                    {error && (<div className="error">{error}</div>)}
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
                        {!inputsValid && (<button className="disabled">Update Profile</button>)}
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default ProfileUpdate;