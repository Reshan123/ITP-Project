import { createContext, useReducer } from "react";

export const lostPetContext = createContext()

//state contains the prvoius data and action contains the object that was newly passed
export const lostPetReducer = (state,action) => {
    switch(action.type){
        case 'SET_LOSTPETNOTICE':
            return{
                lostNotice:action.payload
            }
        case 'CREATE_LOSTPETNOTICE':
            return{
                lostNotice:[action.payload,...state.lostNotice]
            } 
        case 'DELETE_WORKOUT' :
            return{
                lostNotice: state.lostNotice.filter((w)=> w._id !== action.payload._id)
            }   
         default:
            return state     
    }

}

//use this in the impoort in the index.js file
//the childeren is the app component that we wrapped in the index.js file
export const  LostPetsContextProvider = ({children}) =>{

    const[state,dispatch] = useReducer(lostPetReducer,{lostNotice:null})
    return(
        <lostPetContext.Provider value={{...state,dispatch}}>
            {children}
        </lostPetContext.Provider>
    )
}