import { createContext, useReducer } from "react";

export const AllPetOwnerContext = createContext();


export const allPetOwnerReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { petOwners: action.payload }
        case "LOGOUT":
            return { petOwners: null }
        default:
            return state
    }
}


export const AllPetOwnerContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(allPetOwnerReducer, {
        petOwners: null
    })

    console.log('AllDocContext state:', state)
      
    return(
        <AllPetOwnerContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AllPetOwnerContext.Provider>
    )
}