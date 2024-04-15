import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "firebase/compat/storage"
import './styles.css'
import { useInventoryItemsContext } from '../../../../hooks/useInventoryItemsContext'


const InventoryItemUpdate = () => {

  const { itemID } = useParams()

  const { inventoryitems, dispatch: intentoryItemDispatch } = useInventoryItemsContext()

  useEffect(() => {
    if (inventoryitems) {
      inventoryitems.map(item => {
        if (item._id == itemID) {
          console.log(item._id)
          if (item.itemName) {
            setItemName(item.itemName)
          }
          if (item.itemPrice) {
            setItemPrice(item.itemPrice)
          }
          if (item.itemStockCount) {
            setItemStockCount(item.itemStockCount)
          }
          if (item.itemDescription) {
            setItemDescription(item.itemDescription)
          }
          if (item.itemImageURL) {
            setItemImageURL(item.itemImageURL)
          }
          if(item.currentStock<19){
            confirm(`The Stock level of "${item.itemName}" is low`)        
          }

        }
      })
    }
  }, [inventoryitems])

  const navigate = useNavigate()

  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemStockCount, setItemStockCount] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemImageURL, setItemImageURL] = useState("")
  const [error, setError] = useState("")

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = {
      itemName,
      itemPrice,
      itemStockCount,
      itemDescription,
      itemImageURL
    }
    axios.put("http://localhost:4000/api/inventoryItems/"+itemID, formData)
      .then(res => {
        intentoryItemDispatch({ type: "UPDATE", payload: [itemID, { itemName, itemPrice, itemStockCount, itemDescription, itemImageURL }] })
        setError("")
        console.log(res)
        navigate('/admin/home/Inventoryitemdetails')
      })
      .catch(err => setError(err.response.data))
  }

  return (
    <div className="update-items">
      <form className="update" onSubmit={handleUpdate}>
        <h3>Update Item</h3>

        <label>Name of the Item</label>
        <input
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />
        <label>Item Price (in LKR)</label>
        <input
          type='number'
          onChange={(e) => setItemPrice(e.target.value)}
          value={itemPrice}
        />
        <label>Initial Stock Level</label>
        <input
          type="number"
          onChange={(e) => setItemStockCount(e.target.value)}
          value={itemStockCount}
        />
        <label>Item Description</label>
        <input
          type="text"
          onChange={(e) => setItemDescription(e.target.value)}
          value={itemDescription}
        />
        <label>Item Image</label>
        <input
          type="file"
          defaultValue={itemImageURL}
        />
        <img src={itemImageURL} alt="item" />
        <input
          type="text"
          placeholder='Image URL'
          value={itemImageURL}
          onChange={(e) => setItemImageURL(e.target.value)}
        />


        <button className='update-btn'>Update</button>
        {error && <div className="error">{error}</div>}
      </form>

    </div>

  )
};

export default InventoryItemUpdate;
