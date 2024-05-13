import { useState } from 'react';
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext";
import { useSupplierContext } from "../../../../hooks/useSupplierContext";
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom';
import "firebase/compat/storage";
import './styles.css';

const InventoryItemForm = () => {
    const { suppliers, dispatch: supplierDispatch } = useSupplierContext();
    const navigate = useNavigate();
    const { inventoryitems, dispatch } = useInventoryItemsContext();
    // const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemStockCount, setItemStockCount] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemImageURL, setItemImageURL] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [error, setError] = useState(null);

    var itemNames = []

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if any value is equal to or less than 0
        if (
            parseFloat(itemPrice) <= 0 ||
            parseFloat(itemStockCount) <= 0
        ) {
            setError("Price and stock count must be greater than 0");
            return;
        }

        const inventoryitem = { itemPrice, itemStockCount, currentStock: itemStockCount, itemDescription, itemImageURL, supplierID };

        const response = await fetch('http://localhost:4000/api/inventoryItems/', {
            method: 'POST',
            body: JSON.stringify(inventoryitem),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            // setItemName('');
            setItemPrice('');
            setItemStockCount('');
            setItemDescription('');
            setItemImageURL('');
            setSupplierID('');
            setError(null);
            console.log('New Item Added!', json);
            dispatch({ type: 'CREATE_ITEM', payload: json });
            navigate('/admin/home/Inventoryitemdetails');
        }
    };

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            fileRef.put(selectedFile)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            console.log(downloadURL);
                            setItemImageURL(downloadURL);
                        });
                });
        } else {
            console.log("No files selected");
        }
    };

    return (
        <div className="create-form">
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Item</h3>
                {/* <label>Name of the Item</label>
                <input
                    type="text"
                    onChange={(e) => setItemName(e.target.value)}
                    value={itemName}
                /> */}
                <label>Name of the Item</label>
                <select
                    id="supplier"
                    onChange={(e) => setSupplierID(e.target.value)}
                    value={supplierID}
                >
                    <option value="">Select Item Name</option>
                    {(inventoryitems && suppliers) && suppliers.map(Supplier => {
                        console.log(itemNames)
                        return inventoryitems.map(inventory => {
                            if (inventory.supplierID != Supplier._id){
                                itemNames.push(Supplier._id)
                            }
                        })
                    })}
                </select>
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
                <div className="add-btn-container">
                    <button className='create-view-btn'>Add Item</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default InventoryItemForm;
