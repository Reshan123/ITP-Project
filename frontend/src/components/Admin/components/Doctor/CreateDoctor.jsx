import { useEffect, useState } from "react";
import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useNavigate } from "react-router-dom";


const CreateDoctor = () => {

    const navigate = useNavigate()
    const {doctors, dispatch:allDocDispatch} = useAllDocContext();
    const [error, setError] = useState("")
    const [formInput, setFormInput] = useState({
        name:"",
        email:"",
        password:"",
        contactNo: ""
    })

    const handleInputChange = (input) => {
        const {name, value} = input.target;
        setFormInput(prevInput => ({...prevInput, [name]: value}))
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/doctor/createDoctor', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formInput)
            })
            const json = await response.json()
        
            if (!response.ok) {
                throw Error(json.message)
            }
            setError("")
            allDocDispatch({type:"ADD DOCTOR",payload:{...json}})
            navigate('/admin/home/doctor')
        } catch (error){
            setError(error.message)
        }
    }


    return ( 
        <>
            <form onSubmit={handleFormSubmit}>
                {error && <div className="error">{error}</div>}
                <div>
                    <label htmlFor="name">Doctor Name: </label>
                    <input type="text" id="name" name="name" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="email">Doctor Email: </label>
                    <input type="email" id="email" name="email" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="password">Doctor Password: </label>
                    <input type="password" id="password" name="password" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="contactNo">Doctor Contact No: </label>
                    <input type="text" id="contactNo" name="contactNo" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
     );
}
 
export default CreateDoctor;