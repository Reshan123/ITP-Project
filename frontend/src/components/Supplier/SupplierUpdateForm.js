import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SupplierUpdateForm = () => {

  const { id } = useParams()

  const [supplierDetails, setSupplierDetails] = useState(null)

  const [supplierName, setSupplierName] = useState(supplierDetails?.supplierName)
  const [supplierContact, setSupplierContact] = useState(supplierDetails?.supplierContact)
  const [supplierEmail, setSupplierEmail] = useState(supplierDetails?.supplierEmail)
  const [supplierCompany, setSupplierCompany] = useState(supplierDetails?.supplierCompany)
  const [itemId, setitemId] = useState(supplierDetails?.itemId)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:2000/api/supplier/' + id);
        const json = await response.json();

        if(!response.ok){
            console.log(json)
        }

        if (response.ok) {
            setSupplierDetails(json);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems()
  }, [id])

 

  const handleUpdate = async (e) => {
    e.preventDefault()

    const supplier = { supplierName, supplierContact, supplierEmail, supplierCompany, itemId }

    const response = await fetch('http://localhost:2000/api/supplier' + id, {
      method: 'PATCH',
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
      setError(null)
      console.log('New Update Added', json)
      window.history.back();
    }
  };

  return (
    <div className="update-items">
      <form className="update" onSubmit={handleUpdate}>
        <h3>Update Supplier</h3>
        {error && (<div>{error}</div>)}
        <label>Name of the Supplier</label>
        <input
          type="text"
          onChange={(e) => setSupplierName(e.target.value)}
          defaultValue={ supplierDetails?.supplierName }
          required
        />
        <label> Enter Supplier Contact</label>
        <input
          type='text'
          onChange={(e) => setSupplierContact(e.target.value)}
          defaultValue={ supplierDetails?.supplierContact }
        />
        <label> Enter Supplier Email</label>
        <input
          type="text"
          onChange={(e) => setSupplierEmail(e.target.value)}
          defaultValue={ supplierDetails?.supplierEmail }
        />
        <label> Enter Supplier Company</label>
        <input
          type="text"
          onChange={(e) => setitemId(e.target.value)}
          defaultValue={ supplierDetails?.supplierCompany}
        />
	<label> Enter ItemID </label>
	<input
          type="text"
          onChange={(e) => setSupplierCompany(e.target.value)}
          defaultValue={ supplierDetails?.itemId}

        />
        
        <button className='update-btn'>Update</button>
        {error && <div className="error">{error}</div>}
      </form>

    </div>

  )

}

export default SupplierUpdateForm
