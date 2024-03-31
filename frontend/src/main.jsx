import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './context/userContext.jsx'
import App from './App.jsx'
import { AdoptionContextProvider } from './context/AdoptionContext.jsx'
import firebase from "firebase/compat/app"
import { PetContextProvider } from './context/petContext.jsx'
import { AllDoctorContextProvider } from './context/allDoctorContext.jsx'
import { DoctorContextProvider } from './context/doctorContext.jsx'
import { AllPetOwnerContextProvider } from './context/allPetOwner.jsx'
import { BookingContext, BookingContextProvider } from './context/BookingContext.jsx'

const firebaseConfig = {
  apiKey: "AIzaSyCdLhIFPlvnkqJiQASjo3TK14TnGlkNwkk",
  authDomain: "test-6ab3a.firebaseapp.com",
  projectId: "test-6ab3a",
  storageBucket: "test-6ab3a.appspot.com",
  messagingSenderId: "920039713792",
  appId: "1:920039713792:web:f979ecedb627ec1e613ce5"
};

firebase.initializeApp(firebaseConfig)


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
      <AdoptionContextProvider>
        <PetContextProvider>
          <BookingContextProvider>
            <DoctorContextProvider>
              <AllDoctorContextProvider>
                <AllPetOwnerContextProvider>
                  <App />
                </AllPetOwnerContextProvider>
              </AllDoctorContextProvider>
            </DoctorContextProvider>
          </BookingContextProvider>
        </PetContextProvider>
      </AdoptionContextProvider>
  </UserContextProvider>
)
