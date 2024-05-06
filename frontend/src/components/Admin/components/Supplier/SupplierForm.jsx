import { useState } from "react"
import { useSupplierContext } from "../../../../context/SupplierContext"
import { useNavigate } from 'react-router-dom'
import './styles.css'

const SupplierForm = () => {
    const navigate = useNavigate
    const {dispatch} = useSupplierContext()
    const [supplierName, setsupplierName] = useState('')
    const [supplierContact, setsupplierContact] = useState('')
    const [supplierEmail, setsupplierEmail] = useState('')
    const [supplierCompany, setsupplierCompany] = useState('')
    const [itemId, setitemId] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) =>
    {
        e.preventDefault()

        const supplier = {supplierName, supplierContact, supplierEmail, supplierCompany, itemId}
        const response = await fetch('http://localhost:4000/api/supplier', {
            method:'POST', 
            body:JSON.stringify(supplier),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        

        if(response.ok)
        {
            setsupplierName('')
            setsupplierContact('')
            setsupplierEmail('')
            setsupplierContact('')
            setitemId ('')
            setError(null)

            console.log('new supplier added', json)
            dispatch({type:'CREATE_SUPPLIERS', payload:json})
            navigate('/admin/home/SupplierDetails')
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new supplier information</h3>
            <label> Supplier Name</label>
            <input
                type="text"
                onChange={(e)=> setsupplierName(e.target.value)}
                value = {supplierName}
            />
            <label> Supplier Contact</label>
            <input
                type="text"
                onChange={(e)=> setsupplierContact(e.target.value)}
                value = {supplierContact}
            />
           <label> Supplier Email</label>
            <input
                type="text"
                onChange={(e)=> setsupplierEmail(e.target.value)}
                value = {supplierEmail}
            />
            <label> Supplier Company</label>
            <input
                type="text"
                onChange={(e)=> setsupplierCompany(e.target.value)}
                value = {supplierCompany}
            />
            <label> Supplier Items ID</label>
            <input
                type="text"
                onChange={(e)=> setitemId(e.target.value)}
                value = {itemId}
            />
             <div className="add-btn-container">
                <button className="create-btn">Add Supplier</button>

            </div>
            {error && <div className="error">{error}</div>}
           
           
           
           
        </form>
    )
}
export default SupplierForm