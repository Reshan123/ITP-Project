import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

export const useBookingContext = () => {

    const context = useContext(BookingContext)

    if(!context){
        throw Error('useBookingContext must be used inside an BookingContextProviders')
    }

    return context
}