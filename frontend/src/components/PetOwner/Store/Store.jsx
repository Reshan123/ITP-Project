import { useEffect } from 'react'
import './styles.css'
import { useInventoryItemsContext } from '../../../hooks/useInventoryItemsContext'
useInventoryItemsContext
const Store = ({ navBarProps }) => {

    navBarProps("#FFF", "#B799D1")
  const { inventoryitems, dispatch } = useInventoryItemsContext()


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

    return (
        <div className="store">
            
                {inventoryitems && inventoryitems.map(inventoryitem => (
                    <div key={inventoryitem._id} className="store-body">

                        <div className="store-cards">

                            <h4>{inventoryitem.itemName}</h4>
                            <p><strong>Price (in LKR): </strong>{inventoryitem.itemPrice}</p>
                            <p><strong>Initial Stock Count: </strong>{inventoryitem.itemStockCount}</p>
                            <p><strong>Current Stock Count: </strong>{inventoryitem.itemStockCount}</p>
                            {/* have put both stock counts the same */}
                            <img src={inventoryitem.itemImageURL} alt="item" />
                            <p><strong>Item Description: </strong>{inventoryitem.itemDescription}</p>
                            {/* <p>{inventoryitem.createdAt}</p> */}

                        </div>


                    </div>
                ))}

        </div>
    );
}

export default Store;