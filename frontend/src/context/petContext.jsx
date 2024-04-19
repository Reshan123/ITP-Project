import { createContext, useReducer } from "react";

export const PetContext = createContext();


export const petReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { pets: action.payload }
        case "ADD PET":
            state.pets.push(action.payload)
            return state
        case "UPDATE PET":
            const objIndex = state.pets.findIndex(obj => obj._id == action.payload[0])
            console.log(action.payload)
            state.pets[objIndex].ownerID = action.payload[1].ownerID
            state.pets[objIndex].petName = action.payload[1].petName
            state.pets[objIndex].petAge = action.payload[1].petAge
            state.pets[objIndex].petSpecies = action.payload[1].petSpecies
            state.pets[objIndex].petGender = action.payload[1].petGender
            state.pets[objIndex].petBreed = action.payload[1].petBreed
            return state;
        case "DELETE PET":
            return { pets: state.pets.filter(obj => obj._id != action.payload) }
        default:
            return state
    }
}


export const PetContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(petReducer, {
        pets: null
    })

    console.log('PetContext state:', state)
      
    return(
        <PetContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PetContext.Provider>
    )
}