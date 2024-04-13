import { AdoptionContext } from "../context/AdoptionContext";
import { useContext } from "react";

export const useAdoptionContext = () => {
    const context = useContext(AdoptionContext)

    return context
}