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