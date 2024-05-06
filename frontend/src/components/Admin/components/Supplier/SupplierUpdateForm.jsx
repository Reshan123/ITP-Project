import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSupplierContext } from '../../../../hooks/useSupplierContext'
import './styles.css'
import { useParams } from 'react-router-dom'

const SupplierUpdateForm = () => {

  const { id } = useParams()

	const { suppliers, dispatch: supplierDispatch } = useSupplierContext()

	 useEffect(() => {
    if (suppliers) {
      suppliers.map(item => {
        if (supplier._id == id) {
          console.log(supplier._id)
          if (supplier.supplierName) {
            setSupplierName(supplier.supplierName)
          }
          if (supplier.supplierContact) {
            setSupplierContact(item.supplierContact)
          }
          if (supplier.supplierEmail) {
            setSupplierEmail(supplier.supplierEmail)
          }
          if (supplier.supplierCompany) {
            setSupplierCompany(supplier.supplierCompany)
          }
       
          // if(item.currentStock<19){
          //   confirm(`The Stock level of "${item.itemName}" is low`)        
          // }

        }
      })
    }
  }, [suppliers])

	const navigate = useNavigate()

  const [supplierName, setsupplierName] = useState("")
  const [supplierContact, setsupplierContact] = useState("")
  const [supplierEmail, setsupplierEmail] = useState("")
  const [supplierCompany, setsupplierCompany] = useState("")
  const [error, setError] = useState("")

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = {
      supplierName,
      supplierContact,
      supplierEmail,
      supplierCompany,
    }
    axios.put("http://localhost:4000/api/supplier/"+ id, formData)
      .then(res => {
        supplierDispatch({ type: "UPDATE", payload: [id, { supplierName, supplierContact, supplierEmail,supplierCompany }] })
        setError("")
        console.log(res)
        navigate('/admin/home/supplierdetails')
      })
      .catch(err => setError(err.response.data))
  }

  return (
    <div className="update-supplier">
      <form className="update" onSubmit={handleUpdate}>
        <h3>Update Supplier</h3>

        <label>Name of the Supplier</label>
        <input
          type="text"
          onChange={(e) => setsupplierName(e.target.value)}
          value={supplierName}
        />
        <label>Supplier Contact</label>
        <input
          type='number'
          onChange={(e) => setsupplierContact(e.target.value)}
          value={supplierContact}
        />
        <label>Supplier Email</label>
        <input
          type="number"
          onChange={(e) => setsupplierEmail(e.target.value)}
          value={supplierEmail}
        />
        <label>Supplier Company </label>
        <input
          type="number"
          onChange={(e) => setsupplierCompany(e.target.value)}
          value={supplierCompany}
        />
        <button className='update-btn'>Update</button>
        {error && <div className="error">{error}</div>}
      </form>

    </div>

  )
};

export default SupplierUpdateForm;
