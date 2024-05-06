import { createContext, useReducer } from "react";

export const SupplierContext = createContext()

export const suppliersReducer = (state, action) => {
    switch (action.type)
    {
        case 'SET_SUPPLIERS':
            return{
                suppliers : action.payload
            }
        case 'CREATE_SUPPLIERS':
            return {
                suppliers:[action.payload, ...state.suppliers ]
            }
        case 'DELETE_SUPPLIER':
            return {
              suppliers: state.suppliers.filter((w) => w._id !== action.payload._id)
            }
            case 'UPDATE':
                const objIndex = state.suppliers.findIndex(obj => obj._id == action.payload[0])
                state.suppliers[objIndex].supplierName = action.payload[1].supplierName
                state.suppliers[objIndex].supplierContact = action.payload[1].supplierContact
                state.suppliers[objIndex].supplierEmail = action.payload[1].supplierEmail
                state.suppliers[objIndex].supplierCompany = action.payload[1].supplierCompany
                return state
        default:
            return state
    }
}

export const SupplierContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(suppliersReducer, {
        suppliers: null
    })

    console.log('supplier state:', state)

    return(
        <SupplierContext.Provider value={{...state, dispatch}}>
            {children}
        </SupplierContext.Provider>
    )
}