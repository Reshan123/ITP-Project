import { AllDoctorContext } from "../context/allDoctorContext"
import { useContext } from "react"

export const useAllDocContext = () => {
  const context = useContext(AllDoctorContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}