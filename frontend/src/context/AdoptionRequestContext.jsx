import { Children, createContext, useReducer } from "react";

export const AdoptionRequestContext = createContext()

export const AdoptionRequestReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FORMS':
            return {
                requestForms: action.payload
            }
        case 'CREATE_FORM':
            return {
                requestForms: [action.payload, ...state.requestForms]
            }
        case 'DELETE_FORM':
            return {
                requestForms: state.requestForms.filter(f => f._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const AdoptionRequestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdoptionRequestReducer, {
        requestForms: null
    })

    console.log("AdoptionRequestContextProvider is rendering", state);

    return (
        <AdoptionRequestContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdoptionRequestContext.Provider>
    )
}