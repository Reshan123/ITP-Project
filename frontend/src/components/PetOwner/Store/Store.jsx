import { useEffect, useState } from 'react';
import './Storestyles.css';
import { useInventoryItemsContext } from '../../../hooks/useInventoryItemsContext';
import storeImage from './images/store.png'
const Store = ({ navBarProps }) => {
    navBarProps("#FFF", "#B799D1", "#B799D1");

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

    const handleClick = async () => {
        // Raveesha's Code

    };


    function renderInventoryItem(inventoryitem) {
        if (inventoryitem.currentStock >= 5) {
            // Define a range of quantities (e.g., from 1 to 10)
            const quantityOptions = Array.from({ length: Math.min(inventoryitem.currentStock, 3) }, (_, index) => index + 1);

            return (
                <div className="card">
                    <div className="image">
                        <img src={inventoryitem.itemImageURL} alt="" />
                    </div>
                    <div className="desc">In Stock: {inventoryitem.currentStock}</div>
                    <div className="title">{inventoryitem.itemName}</div>
                    <div className="description">{inventoryitem.itemDescription}</div>
                    <br />
                        <div className="price">{inventoryitem.itemPrice} LKR</div>
                    <div className="box">
                        <div className="quantity">
                            <label>Select the Quantity</label>
                            <input
                                type='number'
                                onChange={(e) => (e.target.value)}
                                value
                            />
                        </div>
                        <button onClick={handleClick} className="btn">Buy Now</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="card">
                    <div className="image">
                        <img src={inventoryitem.itemImageURL} alt="" />
                    </div>
                    <div className="desc" style={{ color: 'red' }}>Out of Stock</div>
                    <div className="title">{inventoryitem.itemName}</div>
                    <div className="description">{inventoryitem.itemDescription}</div>
                    <div className="box">
                        <div className="price">{inventoryitem.itemPrice} LKR</div>
                    </div>
                </div>
            );

        }
    }


    return (
        <div className="store">


            <div class="landing-section">
                <div class="content-wrapper">
                    <div class="image-section">
                        <img src={storeImage} alt="" />
                    </div>
                    <div class="text-section">
                        <div class="heading">Pet Foods and Many More!</div>
                        <div class="paraText">Pawsitively delightful treats and treasures await at
                            Pawpulz! From yummy eats to adorable accessories, we've got everything your fur
                            baby needs for a tail-wagging good time!
                        </div>
                    </div>
                </div>
            </div>

            <div className="shopItems">
                {inventoryitems && inventoryitems.map(inventoryitem => renderInventoryItem(inventoryitem))}
            </div>

        </div>
    );
    ;
};

export default Store;
