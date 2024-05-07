import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSupplierContext } from '../../../../hooks/useSupplierContext';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const SupplierUpdateForm = () => {
  const { id } = useParams();
  const { suppliers, dispatch: supplierDispatch } = useSupplierContext();
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierCompany, setSupplierCompany] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (suppliers) {
      suppliers.forEach(supplier => {
        if (supplier._id === id) {
          if (supplier.supplierName) {
            setSupplierName(supplier.supplierName);
          }
          if (supplier.supplierContact) {
            setSupplierContact(supplier.supplierContact);
          }
          if (supplier.supplierEmail) {
            setSupplierEmail(supplier.supplierEmail);
          }
          if (supplier.supplierCompany) {
            setSupplierCompany(supplier.supplierCompany);
          }
        }
      });
    }
  }, [id, suppliers]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Validation for contact field
    if (supplierContact.length > 10) {
      setError("Contact number cannot be more than 10 digits.");
      return;
    }
  
    e.preventDefault()
    const formData = {
      supplierName,
      supplierContact,
      supplierEmail,
      supplierCompany,
    };
    axios.patch('http://localhost:4000/api/supplier/'+ id, formData)
      .then(res => {
        supplierDispatch({ type: "UPDATE", payload: [id, { supplierName, supplierContact, supplierEmail, supplierCompany }] });
        setError("");
        console.log(res);
        navigate('/admin/home/supplier');
      })
      .catch(err => setError(err.response.data));
  
}


  return (
    <div className="update-supplier">
      <form className="update" onSubmit={handleUpdate}>
        <h3>Update Supplier</h3>

        <label>Name of the Supplier</label>
        <input
          type="text"
          onChange={(e) => setSupplierName(e.target.value)}
          value={supplierName}
        />
        <label>Supplier Contact</label>
        <input
          type='text'
          onChange={(e) => setSupplierContact(e.target.value)}
          value={supplierContact}
        />
        <label>Supplier Email</label>
        <input
          type="email"
          onChange={(e) => setSupplierEmail(e.target.value)}
          value={supplierEmail}
        />
        <label>Supplier Company</label>
        <input
          type="text"
          onChange={(e) => setSupplierCompany(e.target.value)}
          value={supplierCompany}
        />
        <button className='update-sup-btn'>Update</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SupplierUpdateForm;
