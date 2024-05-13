import { createContext, useReducer } from "react";

export const AdoptionContext = createContext()

export const AdoptionReducer = (state, action) => {

    switch (action.type) {
        case 'SET_FORMS':
            return {
                adoptionForms: action.payload
            }
        case 'CREATE_FORM':
            return {
                ...state,
                requestForms: Array.isArray(state.requestForms) ? [action.payload, ...state.requestForms] : [action.payload]
            };

        case 'DELETE_FORM':
            return {
                adoptionForms: state.adoptionForms.filter(f => f._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const AdoptionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdoptionReducer, {
        adoptionForms: null
    })

    console.log("AdoptionContextProvider is rendering", state);

    return (
        <AdoptionContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdoptionContext.Provider>
    )

}