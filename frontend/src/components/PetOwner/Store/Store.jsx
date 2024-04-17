import { useEffect, useState } from 'react';
import './Storestyles.css';
import { useInventoryItemsContext } from '../../../hooks/useInventoryItemsContext';

const Store = ({ navBarProps }) => {
    navBarProps("#FFF", "#B799D1");

    const { inventoryitems, dispatch } = useInventoryItemsContext();
    // const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/inventoryItems/');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory items');
                }
                const json = await response.json();
                dispatch({ type: 'SET_ITEMS', payload: json });
            } catch (error) {
                console.error(error);
            }
        };

        fetchInventoryItems();
    }, [dispatch]);

    const reduceStock = async () => {

    };


    function renderInventoryItem(inventoryitem) {
        if (inventoryitem.currentStock >= 5) {
            return (
                <div key={inventoryitem._id} className="store-body">
                    <div className="store-cards">
                        <h4>{inventoryitem.itemName}</h4>
                        <p><strong>Price (in LKR): </strong>{inventoryitem.itemPrice}</p>
                        <p><strong>Initial Stock Count: </strong>{inventoryitem.itemStockCount}</p>
                        <p><strong>Current Stock Count: </strong>{inventoryitem.currentStock}</p>
                        <img src={inventoryitem.itemImageURL} alt="item" />
                        <p><strong>Item Description: </strong>{inventoryitem.itemDescription}</p>
                        <button className="buy-btn">Buy</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={inventoryitem._id} className="store-body out-of-stock">
                    <div className="store-cards">
                        <h4>{inventoryitem.itemName}</h4>
                        <p><strong>Price (in LKR): </strong>{inventoryitem.itemPrice}</p>
                        <p><strong>Initial Stock Count: </strong>{inventoryitem.itemStockCount}</p>
                        <p>Out of Stock</p>
                        <img src={inventoryitem.itemImageURL} alt="item" />
                        <p><strong>Item Description: </strong>{inventoryitem.itemDescription}</p>
                    </div>
                </div>
            );
        }
    }
    
    
    return (
        <div className="store">
            {inventoryitems && inventoryitems.map(inventoryitem => renderInventoryItem(inventoryitem))}
        </div>
    );
    ;
};

export default Store;
