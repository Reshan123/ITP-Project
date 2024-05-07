import { SalesContext } from "../context/SalesContext";
import { useContext } from "react";

export const useSalesContext = () => {
    const context = useContext(SalesContext)

    if(!context){
        throw Error('useSalesContext must be used inside a SalesContextProvider')
    }

    return context
}