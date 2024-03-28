import { createContext, useReducer } from "react";

export const AllDoctorContext = createContext();


export const allDoctorReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { doctors: action.payload }
        case "ADD PET":
            state.doctors.push(action.payload)
            return state
        case "LOGOUT":
            return { doctors: null }
        default:
            return state
    }
}


export const AllDoctorContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(allDoctorReducer, {
        doctors: null
    })

    console.log('AllDocContext state:', state)
      
    return(
        <AllDoctorContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AllDoctorContext.Provider>
    )
}