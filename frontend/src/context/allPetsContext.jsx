import { createContext, useReducer } from "react";

export const AllPetsContext = createContext();


export const allPetsReducer = (state, action) => {
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