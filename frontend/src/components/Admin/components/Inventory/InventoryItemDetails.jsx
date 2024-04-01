import React from "react"
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import './styles.css'
import { useEffect } from "react"

const InventoryItemDetails = () => {

  const { inventoryitems, dispatch } = useInventoryItemsContext()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventoryItems = async () => {
      const response = await fetch('http://localhost:4000/api/inventoryItems/')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json })
      }
    }

    fetchInventoryItems()
  }, [dispatch])

  const handleClick = async (id) => {
    const response = await fetch('http://localhost:4000/api/inventoryItems/' + id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_ITEM', payload: json })

    }
  }


  return (


    <div className="inventoryiems">
      <button className='add-btn' onClick={() => navigate(`/admin/home/InventoryItemForm/`)} >Add Item</button>

      {inventoryitems && inventoryitems.map(inventoryitem => (
        <div key={inventoryitem._id} className="inventory-body">

          <div className="inventoryItems-details">

            <h4>{inventoryitem.itemName}</h4>
            <p><strong>Price (in LKR): </strong>{inventoryitem.itemPrice}</p>
            <p><strong>Initial Stock Count: </strong>{inventoryitem.itemStockCount}</p>
            <p><strong>Current Stock Count: </strong>{inventoryitem.itemStockCount}</p>
            {/* have put both stock counts the same */}
            <p><strong>Item Description: </strong>{inventoryitem.itemDescription}</p>
            <img src={inventoryitem.itemImageURL} alt="item" />
            <p>{inventoryitem.createdAt}</p>

            <button className='dlt-btn' onClick={() => handleClick(inventoryitem._id)}>Delete</button>
            <button className='update-btn' onClick={() => navigate(`/admin/home/InventoryItemUpdate/${inventoryitem._id}`)} >Update</button>

          </div>


        </div>
      ))}
    </div>


  )
}

export default InventoryItemDetails