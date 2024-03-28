import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('adminUser')){
            navigate('/admin/home')
        }
    }, [localStorage.getItem('adminUser')])

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
            const response = await fetch("http://localhost:4000/api/admin/login", config);
            const json = await response.json()

            if(!response.ok){
                throw Error(json.message)
            }

            localStorage.setItem("adminUser", JSON.stringify(json))
            navigate("/admin/home")

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