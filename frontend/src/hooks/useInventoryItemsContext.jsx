import { useContext } from "react";
import { InventoryItemsContext } from "../context/InventoryItemsContext";

export const useInventoryItemsContext= () => {
    const context = useContext(InventoryItemsContext)

    if(!context){
        throw Error('useInventoryItemsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}