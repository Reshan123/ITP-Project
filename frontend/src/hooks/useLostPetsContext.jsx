import { lostPetContext } from '../context/LostPetContext'
import { useContext } from 'react'

export const useLostPetsContext = () =>{
    const context = useContext(lostPetContext)

    if(!context){
        throw Error('useLostPetContext must be used ina a lostPetContextprovider')
    }

    return context
}