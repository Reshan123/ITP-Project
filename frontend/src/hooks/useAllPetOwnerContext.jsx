import { AllPetOwnerContext } from "../context/allPetOwner"
import { useContext } from "react"

export const useAllPetOwnerContext = () => {
  const context = useContext(AllPetOwnerContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}