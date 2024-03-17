import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useUserContext } from "../../../hooks/userContextHook";
import './styles.css'

const SignIn = ({ setNavBarColor }) => {

    setNavBarColor("#B597CF")
    const navigate = useNavigate()
    const {dispatch} = useUserContext()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [inputValidity, setInputValidity] = useState(false)

    useEffect(() => {
        if(name.length != 0 && email.length != 0 && password.length >= 8){
            setInputValidity(true)
        } else {
            setInputValidity(false)
        }
    }, [name, email, password])

    const onSigninFormSubmit = (e) => {
        e.preventDefault()
        const dataToSend = { name, email, password }
        const submitData = async () => {
            const response = await fetch('http://localhost:4000/api/petOwner/signin', {
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
        <div className="signinPage">
            <div className="signinPageContent">
                <div className="signinHeader">
                    <div className="signinHeading">Sign Up</div>
                    <div className="signinNoAccount">
                        <p>Already got an account?</p>
                        <NavLink to="/pet/login">Sign In</NavLink>
                    </div>
                </div>
                <div className="errorMessage">{error}</div>
                <form className="signinForm" onSubmit={onSigninFormSubmit}>
                    <div className="siginFormInputWrapper">
                        <label htmlFor="name">Username </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
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
 
export default SignIn;