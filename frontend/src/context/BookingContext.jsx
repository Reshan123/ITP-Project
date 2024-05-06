import React, { createContext, useReducer } from 'react'

export const BookingContext = createContext()

export const bookingReducer = (state,action) => {
    switch(action.type){
        case 'SET_BOOKINGS':
            return {
                bookings: action.payload
            }
        
        case 'CREATE_BOOKING':
            return{
                bookings: [action.payload, ...state.bookings]
            }
        
        case 'DELETE_BOOKING':
            return {
                bookings: state.bookings.filter((b) => b._id !== action.payload._id)
            }
            
        case 'UPDATE_BOOKING_STATUS':
            return {
                bookings: state.bookings.map((booking) =>
                booking._id === action.payload.id
                    ? { ...booking, status: action.payload.status }
                    : booking
                )
            }

        default:
            return state
    }
}

export const BookingContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(bookingReducer, {
        bookings: null
    })

    console.log('BookingContext state:', state)

    return(
        <BookingContext.Provider value={{...state, dispatch}}>
            {children}
        </BookingContext.Provider>
    )

}