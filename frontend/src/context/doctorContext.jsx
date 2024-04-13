import { createContext, useReducer, useEffect } from "react";

export const DoctorContext = createContext();


export const doctorReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return { doctor: action.payload }
        case "LOGOUT":
            return { doctor: null }
        case "UPDATE":
            return { doctor: {...action.payload, userToken: state.doctor.userToken}}
        case "UPDATE AVAILABILITY":
            state.doctor.availability = action.payload
            return state
        default:
            return state
    }
}


export const DoctorContextProvider = ({ children }) =>{
    
    const [state, dispatch] = useReducer(doctorReducer, {
        doctor: null
    })

    useEffect(() => {
        const doctor = JSON.parse(localStorage.getItem('doctor'))
    
        if (doctor) {
          dispatch({ type: 'LOGIN', payload: doctor }) 
        }
    }, [])

    console.log('DoctorContext state:', state)
      
    return(
        <DoctorContext.Provider value={{ ...state, dispatch }}>
            { children }
        </DoctorContext.Provider>
    )
}