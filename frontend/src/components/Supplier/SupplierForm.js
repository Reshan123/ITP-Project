import { useState } from "react"

const SupplierForm = () => {
    const [supplierName, setsupplierName] = useState('')
    const [supplierContact, setsupplierContact] = useState('')
    const [supplierEmail, setsupplierEmail] = useState('')
    const [supplierCompany, setsupplierCompany] = useState('')
    const [itemId, setitemId] = useState('')
    const handleSubmit = async(e) =>
    {
        e.preventDefault()

        const supplier = {supplierName, supplierContact, supplierEmail, supplierCompany, itemId}
        const response = await fetch('http://localhost:2000/api/supplier', {
            method:'POST', 
            body:JSON.stringify(supplier),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if(response.ok)
        {
            setsupplierName('')
            setsupplierContact('')
            setsupplierEmail('')
            setsupplierContact('')
            setitemId ('')
            console.log('new supplier added', json)
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
            <button>Add Supplier</button>
           
           
           
           
        </form>
    )
}
export default SupplierForm