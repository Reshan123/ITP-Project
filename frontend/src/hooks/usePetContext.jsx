import { PetContext } from "../context/petContext"
import { useContext } from "react"

export const usePetContext = () => {
  const context = useContext(PetContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}