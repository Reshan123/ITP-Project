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