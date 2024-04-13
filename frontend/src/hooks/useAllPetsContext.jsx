import { AllPetsContext } from "../context/allPetsContext"
import { useContext } from "react"

export const useAllPetsContext = () => {
  const context = useContext(AllPetsContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}