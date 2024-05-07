import { useState } from "react"
import { useSupplierContext } from "../../../../hooks/useSupplierContext"
import { useNavigate } from 'react-router-dom'
import './styles.css'

const SupplierForm = () => {
    const navigate = useNavigate()
    const { dispatch } = useSupplierContext()
    const [supplierName, setSupplierName] = useState('')
    const [supplierContact, setSupplierContact] = useState('')
    const [supplierEmail, setSupplierEmail] = useState('')
    const [supplierCompany, setSupplierCompany] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const supplier = { supplierName, supplierContact, supplierEmail, supplierCompany }
        const response = await fetch('http://localhost:4000/api/supplier', {
            method: 'POST',
            body: JSON.stringify(supplier),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }


        if (response.ok) {
            setSupplierName('')
            setSupplierContact('')
            setSupplierEmail('')
            setSupplierCompany('')
            setError(null)

            console.log('new supplier added', json)
            dispatch({ type: 'CREATE_SUPPLIERS', payload: json })
            navigate('/admin/home/supplier')
        }
    }
    const handleContactChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setSupplierContact(value);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new supplier information</h3>
            <label> Supplier Name</label>
            <input
                type="text"
                onChange={(e) => setSupplierName(e.target.value)}
                value={supplierName}
            />
            <label> Supplier Contact</label>
            <input
                type="text"
                onChange={handleContactChange}
                value={supplierContact}
            />
            <label> Supplier Email</label>
            <input
                type="text"
                onChange={(e) => setSupplierEmail(e.target.value)}
                value={supplierEmail}
            />
            <label> Supplier Company</label>
            <input
                type="text"
                onChange={(e) => setSupplierCompany(e.target.value)}
                value={supplierCompany}
            />

            <div className="add-btn-container">

                < button className='create-sup-btn'>Add Supplier</button>
            </div>

            {error && <div className="error">{error}</div>}




        </form>
    )
}
export default SupplierForm