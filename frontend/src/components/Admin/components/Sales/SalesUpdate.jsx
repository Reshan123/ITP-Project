import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSalesContext } from '../../../../hooks/useSalesContext';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'

const SalesUpdateForm = () => {
    const {id} = useParams()
    const {sales, dispatch: salesDispatch} = useSalesContext()
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const[status, setSalesStatus] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (sales) {
          sales.map(sale => {
            console.log(sale)
            if (sale._id === id) {
              if (sale.itemName) {
                setItemName(sale.itemName);
              }
              if (sale.itemPrice) {
                setItemPrice(sale.itemPrice);
              }
              if (sale.quantity) {
                setQuantity(sale.quantity);
              }
              if(sale.status){
                setSalesStatus(sale.status)
              }
            }
          });
        }
      }, [id, sales]);

      const updateSale = (e) => {
        e.preventDefault()
        const formData = {
          itemName,
          itemPrice,
          quantity,
          status,
        };
        axios.patch('http://localhost:4000/api/sales/'+ id, formData)
          .then(res => {
            salesDispatch({ type: "UPDATE", payload: [id, { itemName, itemPrice, quantity,status }] });
            setError("");
            console.log(res);
            navigate('/admin/home/saleshome');
          })
          .catch(err => setError(err.response.data));
      }

      return (
        <div className="update-sale">
          <form className="update" onSubmit={updateSale}>
            <h3>Update Sale</h3>
    
            <label>Item Name</label>
                        <input
                            onChange={(e) => setItemName(e.target.value)}
                            type="text"
                            value={itemName}
                            disabled // make it disabled so users cannot edit
                        />

                    <label>Item Price</label>
                    <input
                        onChange={(e) => setItemPrice(e.target.value)}
                        type="text"
                        value={itemPrice}
                        disabled // make it disabled so users cannot edit
                    />

                    <label>Quantity</label>
                    <input
                        onChange={(e) => setQuantity(e.target.value)}
                        type="text"
                        value={quantity}
                        disabled // make it disabled so users cannot edit
                    />
                    
                    <label>Status</label>
                    <select onChange={(e) => setSalesStatus(e.target.value)} value={status}>
                        <option value="">Select Status</option>
                        <option value="Sold">Sold</option>
                        <option value="Refund">Refund</option>
                    </select>



            <button className='update-btn'>Update</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )
}

export default SalesUpdateForm