import { UserContext } from "../context/userContext"
import { useContext } from "react"

export const useUserContext = () => {
  const context = useContext(UserContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}