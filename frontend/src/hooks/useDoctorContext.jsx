import { DoctorContext } from "../context/doctorContext"
import { useContext } from "react"

export const useDoctorContext = () => {
  const context = useContext(DoctorContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}