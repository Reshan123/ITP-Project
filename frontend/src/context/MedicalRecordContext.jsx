import { createContext, useReducer } from "react";

export const medicalRecContext = createContext();

export const MedicalRecReducer = (state, action) => {
    switch(action.type) {
        case 'SET_MEDICAL_RECORD':
            return {
                medicalRec: action.payload
            };
        case 'CREATE_MEDICAL_RECORD':
            return {
                medicalRec: [action.payload, ...state.medicalRec]
            };
        case 'DELETE_MEDICAL_RECORD':
            return {
                medicalRec: state.medicalRec.filter((record) => record._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const MedicalRecordContext = ({ children }) => {
    const [state, dispatch] = useReducer(MedicalRecReducer, { medicalRec: null });

    return (
        <medicalRecContext.Provider value={{ ...state, dispatch }}>
            {children}
        </medicalRecContext.Provider>
    );
};
