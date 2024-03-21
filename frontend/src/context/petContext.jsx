import { createContext, useReducer } from "react";

export const PetContext = createContext();


export const petReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { pets: action.payload }
        case "ADD PET":
            state.pets.push(action.payload)
            return state
        case "LOGOUT":
            return { pets: null }
        default:
            return state
    }
}


export const PetContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(petReducer, {
        user: null
    })

    console.log('PetContext state:', state)
      
    return(
        <PetContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PetContext.Provider>
    )
}