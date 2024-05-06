import { medicalRecContext } from '../context/MedicalRecordContext'
import { useContext } from 'react'

export const useMedicalRecordContext = () =>{
    const context = useContext(medicalRecContext)

    if(!context){
        throw Error('useMedicalRecordContext must be used in a MedicalRecordContext')
    }

    return context
}