import React from "react"
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import './styles.css'
import { useEffect , useState} from "react"

const InventoryItemDetails = () => {

  const { inventoryitems, dispatch } = useInventoryItemsContext()
  const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();


  useEffect(() => {
    setCurrentlyDisplayedItems(inventoryitems)
  }, [inventoryitems])


  useEffect(() => {
    if (inventoryitems) {
      const filteredList = inventoryitems.filter(inventoryitem => {
        return ((inventoryitem.itemName.startsWith(searchQuery)))
      })
      setCurrentlyDisplayedItems(filteredList)
    }
  }, [searchQuery])


  const handleClick = async (id) => {
    const confrimDelte = confirm("Are u sure?")
    if (confrimDelte) {
      const response = await fetch('http://localhost:4000/api/inventoryItems/' + id, {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'DELETE_ITEM', payload: json })

      }
    }
  };


  return (


    <div className="inventoryiems">

      <div className="inventoryiemsHeader">
        <p>Invenotry Items</p>
        <div>
          <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className='add-btn' onClick={() => navigate(`/admin/home/InventoryItemForm/`)} >Add a new Item</button>
          <button>Print</button>
        </div>
      </div>

      <table className="inventoryItemsTable">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Initial Stock Count</th>
            <th>Current Stock Count</th>
            <th>Item Description</th>
            <th>Item image</th>
          </tr>
        </thead>
        <tbody>
          {currentlyDisplayedItem && currentlyDisplayedItem.map(inventoryitem => (
            <tr>
              <td>{inventoryitem.itemName}</td>
              <td>{inventoryitem.itemPrice}</td>
              <td>{inventoryitem.itemStockCount}</td>
              <td>{inventoryitem.currentStock}</td>
              <td>{inventoryitem.itemDescription}</td>
              <td>{<img src={inventoryitem.itemImageURL} alt="item" />}</td>

              <td>
                <center>
                  <button className='update-btn' onClick={() => navigate(`/admin/home/InventoryItemUpdate/${inventoryitem._id}`)} >Update</button>
                  <button className='dlt-btn' onClick={() => handleClick(inventoryitem._id)}>Delete</button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>





    </div>


  )
}

export default InventoryItemDetails