import { AdoptionRequestContext } from "../context/AdoptionRequestContext";
import { useContext } from "react";

export const useAdoptionRequestContext = () => {
    const context = useContext(AdoptionRequestContext)

    return context
}