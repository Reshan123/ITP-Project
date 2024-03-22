import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorContext } from '../../hooks/useDoctorContext'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const {doctor, dispatch} = useDoctorContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (doctor){
            navigate('/doctor/home')
        }
    }, [doctor])


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email,
                password
            })
        }
        try{
            const response = await fetch("http://localhost:4000/api/doctor/login", config);
            const json = await response.json()

            if(!response.ok){
                throw Error(json.error)
            }

            localStorage.setItem("doctor", JSON.stringify(json))
            dispatch({type:"LOGIN",payload:json})
            navigate("/doctor/home/")

        } catch (error){
            setError(error.message)
        }
    }

    return ( 
        <div className="adminLoginPage" onSubmit={handleFormSubmit}>
            <div className="adminLoginPageTitle">Login Page</div>
            {error && (<div className="error">{error}</div>)}
            <form className="adminLoginForm">
                <div className="adminLoginInputWrapper">
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="adminLoginInputWrapper">
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="adminLoginButtonWrapper">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default Login;