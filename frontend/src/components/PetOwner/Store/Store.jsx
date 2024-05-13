import { useEffect, useState } from 'react';
import './Storestyles.css';
import { useInventoryItemsContext } from '../../../hooks/useInventoryItemsContext';
import { useSupplierContext } from '../../../hooks/useSupplierContext';
import storeImage from './images/store.png'
const Store = ({ navBarProps }) => {

    const [quantity, setQuantity] = useState();
    const [error, setError] = useState("")

    navBarProps("#FFF", "#B799D1", "#B799D1");

    const { inventoryitems, dispatch } = useInventoryItemsContext();
    const { suppliers, dispatch: supplierDispatch } = useSupplierContext()

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

    useEffect(() => {
        if (!error == ""){
            alert(error)
        }
    }, [error])

    const handleClick = async (inventoryitem) => {

        try{
            console.log(inventoryitem)
            const updateStockCount = await fetch('http://localhost:4000/api/inventoryItems/updateStockCount/' + inventoryitem._id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ orderQuantity: quantity })
            })
            const updateStockCountJson = await updateStockCount.json()

            if(!updateStockCount.ok){
                throw Error(updateStockCountJson.error)
            }

            setError('')
            console.log(updateStockCountJson)
            dispatch({type: "UPDATE_STOCK", payload: [inventoryitem._id, quantity]})



            const formData = {
                itemName: inventoryitem.itemName,
                itemPrice: inventoryitem.itemPrice,
                quantity: quantity,
                status: 'sold'
            }
            console.log(formData)
    
            const createSale = await fetch('http://localhost:4000/api/sales/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
    
            const createSaleJson = await createSale.json()
            console.log(createSaleJson)

            setQuantity('')

        } catch (error){
            setError(error.message)
        }

    };


    return (
        <div className="store">


            <div className="landing-section">
                <div className="content-wrapper">
                    <div className="image-section">
                        <img src={storeImage} alt="" />
                    </div>
                    <div className="text-section">
                        <div className="heading">Pet Foods and Many More!</div>
                        <div className="paraText">Pawsitively delightful treats and treasures await at
                            Pawpulz! From yummy eats to adorable accessories, we've got everything your fur
                            baby needs for a tail-wagging good time!
                        </div>
                    </div>
                </div>
            </div>

            <div className="shopItems">
                {(inventoryitems && suppliers) && inventoryitems.map((inventoryitem, iterator) => {
                    if (inventoryitem.currentStock >= 5) {
                        // Define a range of quantities (e.g., from 1 to 10)
                        const quantityOptions = Array.from({ length: Math.min(inventoryitem.currentStock, 3) }, (_, index) => index + 1);
            
                        return (
                            <div className="card" key={iterator}>
                                <div className="image">
                                    <img src={inventoryitem.itemImageURL} alt="" />
                                </div>
                                <div className="desc">In Stock: {inventoryitem.currentStock}</div>
                                <div className="title">{suppliers.map(Supplier => ((Supplier._id == inventoryitem.supplierID) && Supplier.itemName))}</div>
                                <div className="description">{inventoryitem.itemDescription}</div>
                                <br />
                                    <div className="price">{inventoryitem.itemPrice} LKR</div>
                                <div className="box">
                                    <div className="quantity">
                                        <label>Select the Quantity</label>
                                        <input
                                            type='number'
                                            onChange={(e) => setQuantity(e.target.value)}
                                            
                                        />
                                    </div>
                                    <button onClick={() => {handleClick(inventoryitem)}} className="btn">Buy Now</button>
                                </div>
                            </div>
                        );
                    }
                    else {
                        return (
                            <div className="card" key={iterator}>
                                <div className="image">
                                    <img src={inventoryitem.itemImageURL} alt="" />
                                </div>
                                <div className="desc" style={{ color: 'red' }}>Out of Stock</div>
                                <div className="title">{suppliers.map(Supplier => ((Supplier._id == inventoryitem.supplierID) && Supplier.itemName))}</div>
                                <div className="description">{inventoryitem.itemDescription}</div>
                                <div className="box">
                                    <div className="price">{inventoryitem.itemPrice} LKR</div>
                                </div>
                            </div>
                        );
            
                    }
                })}
            </div>

        </div>
    );
    ;
};

export default Store;
