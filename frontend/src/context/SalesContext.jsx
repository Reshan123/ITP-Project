import { createContext, useReducer} from "react";

export const SalesContext = createContext()

export const salesReducer = (state, action) => {
    switch(action.type){
        case 'SET_SALES':
            return {
                sales: action.payload
            }

        case 'DELETE_SALE':
            return{
                sales: state.sales.filter((w) => w._id !== action.payload._id )
            }
          
        case 'UPDATE':
            const objIndex = state.sales.findIndex(obj => obj._id == action.payload[0])
            state.sales[objIndex].itemName = action.payload[1].itemName
            state.sales[objIndex].itemPrice = action.payload[1].itemPrice
            state.sales[objIndex].quantity = action.payload[1].quantity
            state.sales[objIndex].status = action.payload[1].status
            return state

        default:
            return state
    }
}

export const SalesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(salesReducer, {
        sales: null
    })

    console.log('sales state:', state)

    return(
        <SalesContext.Provider value={{...state, dispatch}}>
            {children}
        </SalesContext.Provider>
    )
}