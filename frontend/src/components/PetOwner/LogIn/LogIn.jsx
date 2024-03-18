import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/userContextHook";
import './styles.css'

const LogIn = ({ setNavBarColor }) => {

    setNavBarColor("#E2929D")
    const navigate = useNavigate()
    
    const { dispatch } = useUserContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [inputValidity, setInputValidity] = useState(false)

    useEffect(() => {
        if(email.length != 0 && password.length >= 8){
            setInputValidity(true)
        } else {
            setInputValidity(false)
        }
    }, [email, password])

    const onLoginFormSubmit = (e) => {
        e.preventDefault()
        const dataToSend = { email, password }
        const submitData = async () => {
            const response = await fetch('http://localhost:4000/api/petOwner/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            })
            const json = await response.json()
        
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                dispatch({type: "LOGIN", payload: json})

                navigate('/pet/home')
                
            }
        }
        submitData()
    }

    return ( 
        <div className="loginPage">
            <div className="loginPageContent">
                <div className="loginHeader">
                    <div className="loginHeading">Sign In</div>
                    <div className="loginNoAccount">
                        <p>Don't have an account?</p>
                        <NavLink to="/pet/signin">Sign Up</NavLink>
                    </div>
                </div>
                <div className="errorMessage">{error}</div>
                <form className="loginForm" onSubmit={onLoginFormSubmit}>
                    <div className="siginFormInputWrapper">
                        <label htmlFor="email">Email </label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="siginFormInputWrapper">
                        <label htmlFor="password">Password </label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="signinFormSubmitButtonWrapper">
                        {inputValidity && (<button type="submit">Sign In</button>)}
                        {!inputValidity && (<button type="submit" className="disabled" disabled>Sign In</button>)}
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default LogIn;