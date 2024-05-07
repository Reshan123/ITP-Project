import { createContext, useReducer } from 'react'

export const InventoryItemsContext = createContext()

export const inventoryItemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                inventoryitems: action.payload
            }
        case 'CREATE_ITEM':
            return {
                inventoryitems: [action.payload, ...state.inventoryitems]
            }
        case 'DELETE_ITEM':
            return {
                inventoryitems: state.inventoryitems.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE':
            const objIndex = state.inventoryitems.findIndex(obj => obj._id == action.payload[0])
            state.inventoryitems[objIndex].Supplier = action.payload[1].Supplier
            state.inventoryitems[objIndex].itemName = action.payload[1].itemName
            state.inventoryitems[objIndex].itemPrice = action.payload[1].itemPrice
            state.inventoryitems[objIndex].itemStockCount = action.payload[1].itemStockCount
            state.inventoryitems[objIndex].currentStock = action.payload[1].currentStock
            state.inventoryitems[objIndex].itemDescription = action.payload[1].itemDescription
            state.inventoryitems[objIndex].itemImageURL = action.payload[1].itemImageURL
            return state
        default:
            return state
    }
}

export const InventoryItemsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(inventoryItemsReducer, {
        inventoryitems: null
    })

    console.log('InventoryItemsContext state:', state)

    return (
        <InventoryItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </InventoryItemsContext.Provider>
    )
}