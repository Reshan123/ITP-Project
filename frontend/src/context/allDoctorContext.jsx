import { createContext, useReducer } from "react";

export const AllDoctorContext = createContext();


export const allDoctorReducer = (state, action) => {
    switch(action.type){
        case "LOAD":
            return { doctors: action.payload }
        case "ADD DOCTOR":
            state.doctors.push(action.payload)
            return state
        case "UPDATE DOCTOR":
            const objIndex = state.doctors.findIndex(obj => obj._id == action.payload[0])
            state.doctors[objIndex].name = action.payload[1].name
            state.doctors[objIndex].email = action.payload[1].email
            state.doctors[objIndex].contactNo = action.payload[1].contactNo
            return state 
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