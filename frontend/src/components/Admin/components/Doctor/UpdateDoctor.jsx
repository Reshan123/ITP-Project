import { useParams } from 'react-router-dom'
import { useAllDocContext } from "../../../../hooks/useAllDoctorContext";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UpdateDoctor = () => {

    const navigate = useNavigate()
    const { docID } = useParams()
    const {doctors, dispatch:allDocDispatch} = useAllDocContext()
    const [docDetails, setDocDetails] = useState({})
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

    useEffect(() => {
        if (doctors){
            setDocDetails(doctors.filter(doc => doc._id == docID))
        }
    }, [doctors])

    useEffect(() => {
        if (docDetails[0]){
            setFormInput({
                name: docDetails[0].name,
                email: docDetails[0].email,
                password:"",
                contactNo: docDetails[0].contactNo
            })
        }
    }, [docDetails])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formInput.password){
                const config = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formInput)
                }
                const response = await fetch(`http://localhost:4000/api/doctor/updateDoctorFromID/${docID}`, config);
                const json = await response.json()

                if(!response.ok){
                    throw Error(json.message)
                }

                allDocDispatch({type:"UPDATE DOCTOR", payload:[json.response._id, formInput]})
                navigate('/admin/home/doctor')
                setError("")

                
            } else {
                const config = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formInput)
                }
                const response = await fetch(`http://localhost:4000/api/doctor/updateDoctorFromID/${docID}`, config);
                const json = await response.json()
                
                if(!response.ok){
                    throw Error(json.message)
                }

                allDocDispatch({type:"UPDATE DOCTOR", payload:[json.response._id, formInput]})
                navigate('/admin/home/doctor')
                setError("")

            }

        } catch (error){
            setError(error.message)
        }
    }


    return ( 
        <div className='updateDoctorForm'>
            {docDetails[0] && (
                <form onSubmit={handleFormSubmit}>
                    <div className="formTitle">Update Doctor Information</div>
                    {error && <div className="error">{error}</div>}
                    <div className='inputContainer'>
                        <label htmlFor="name">Doctor Name: </label>
                        <input type="text" id="name" name="name" value={formInput.name} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor="email">Doctor Email: </label>
                        <input type="email" id="email" name="email" value={formInput.email} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor="password">Doctor Password: </label>
                        <input type="password" id="password" name="password" onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor="contactNo">Doctor Contact No: </label>
                        <input type="text" id="contactNo" name="contactNo" value={formInput.contactNo} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className='buttonContainer'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
            {!docDetails[0] && (<div>Loading</div>)}
        </div>
    );
}
 
export default UpdateDoctor;