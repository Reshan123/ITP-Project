import { useState } from 'react'
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext"
import firebase from "firebase/compat/app"
import { useNavigate } from 'react-router-dom'
import "firebase/compat/storage"
import './styles.css'

const InventoryItemForm = () => {

    const navigate = useNavigate()
    const { dispatch } = useInventoryItemsContext()
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemStockCount, setItemStockCount] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemImageURL, setItemImageURL] = useState('')
    const [error, setError] = useState(null)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const inventoryitem = { itemName, itemPrice, itemStockCount, itemDescription, itemImageURL }

        const response = await fetch('http://localhost:4000/api/inventoryItems/', {
            method: 'POST',
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
            setItemName('')
            setItemPrice('')
            setItemStockCount('')
            setItemDescription('')
            setItemImageURL('')
            setError(null)
            console.log('New Item Added!', json)
            dispatch({ type: 'CREATE_ITEM', payload: json })
            navigate('/admin/home/Inventoryitemdetails')
        }
    }
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

    return (

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Item</h3>

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
                onChange={handleFileUpload}
            />

            <input
                type="text"
                placeholder='Image URL'
                value={itemImageURL}
                onChange={(e) => setItemImageURL(e.target.value)}
            />

            < button className='create-btn'>Add Item</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default InventoryItemForm