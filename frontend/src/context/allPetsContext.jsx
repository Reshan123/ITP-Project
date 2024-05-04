import { createContext, useReducer } from "react";

export const AllPetsContext = createContext();


export const allPetsReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { pets: action.payload }
        case "ADD PET":
            state.pets.push(action.payload)
            return state
        case "DELETE PET":
            return { pets: state.pets.filter(obj => obj._id != action.payload) }
        case "UPDATE PET":
            const objIndex = state.pets.findIndex(obj => obj._id == action.payload[0])
            state.pets[objIndex].ownerID = action.payload[1].ownerID
            state.pets[objIndex].petName = action.payload[1].petName
            state.pets[objIndex].petAge = action.payload[1].petAge
            state.pets[objIndex].petSpecies = action.payload[1].petSpecies
            state.pets[objIndex].petGender = action.payload[1].petGender
            state.pets[objIndex].petBreed = action.payload[1].petBreed
            return state
        default:
            return state
    }
}


export const AllPetsContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(allPetsReducer, {
        pets: null
    })

    console.log('AllPetsContext state:', state)
      
    return(
        <AllPetsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AllPetsContext.Provider>
    )
}