import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import './styles.css'

const InventoryItemUpdate = () => {

  const { id } = useParams()

  const [inventoryitem, setInventoryitem] = useState(null)

  const [itemName, setItemName] = useState(inventoryitem?.itemName)
  const [itemPrice, setItemPrice] = useState(inventoryitem?.itemPrice)
  const [itemStockCount, setItemStockCount] = useState(inventoryitem?.itemStockCount)
  const [itemDescription, setItemDescription] = useState(inventoryitem?.itemDescription)
  const [itemImageURL, setItemImageURL] = useState(inventoryitem?.itemImageURL)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/inventoryItems/' + id);
        const json = await response.json();

        if (response.ok) {
          setInventoryitem(json);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems()
  }, [id])

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(selectedFile.name)

      fileRef.put(selectedFile)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              console.log(downloadURL)
              setItemImageURL(downloadURL)
            })
        })
    } else {
      console.log("No files selected")
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const inventoryitem = { itemName, itemPrice, itemStockCount, itemDescription, itemImageURL }

    const response = await fetch('http://localhost:4000/api/inventoryItems/' + id, {
      method: 'PATCH',
      body: JSON.stringify(inventoryitem),
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
    <form className="update" onSubmit={handleUpdate}>
      <h3>Update Item</h3>

      <label>Name of the Item</label>
      <input
        type="text"
        onChange={(e) => setItemName(e.target.value)}
        defaultValue={inventoryitem?.itemName}
        required
      />
      <label>Item Price (in LKR)</label>
      <input
        type='number'
        onChange={(e) => setItemPrice(e.target.value)}
        defaultValue={inventoryitem?.itemPrice}
      />
      <label>Initial Stock Level</label>
      <input
        type="number"
        onChange={(e) => setItemStockCount(e.target.value)}
        defaultValue={inventoryitem?.itemStockCount}
      />
      <label>Item Description</label>
      <input
        type="text"
        onChange={(e) => setItemDescription(e.target.value)}
        defaultValue={inventoryitem?.itemDescription}
      />
      <img src={inventoryitem?.itemImageURL} alt="item" />
      <label>Item Image</label>
      <input
        type="file"
        defaultValue={inventoryitem?.itemImageURL}
        onChange={handleFileUpload}

      />
      <input
        type="text"
        placeholder='Image URL'
        value={itemImageURL}
        onChange={(e) => setItemImageURL(e.target.value)}
      />


      <button >Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  )

}

export default InventoryItemUpdate