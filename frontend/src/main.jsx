import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './context/userContext.jsx'
import { AdoptionContextProvider } from './context/AdoptionContext.jsx'
import { PetContextProvider } from './context/petContext.jsx'
import { AllDoctorContextProvider } from './context/allDoctorContext.jsx'
import { DoctorContextProvider } from './context/doctorContext.jsx'
import { AllPetOwnerContextProvider } from './context/allPetOwner.jsx'
import { BookingContext, BookingContextProvider } from './context/BookingContext.jsx'
import { LostPetsContextProvider } from './context/LostPetContext.jsx'
import {ConversationProvider } from './context/ConversationContext.jsx'
import { AllPetsContextProvider } from './context/allPetsContext.jsx'
import { InventoryItemsContextProvider } from './context/InventoryItemsContext.jsx'
import { SalesContextProvider } from './context/SalesContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { SupplierContextProvider } from './context/SupplierContext.jsx'
import { MedicalRecordContext } from './context/MedicalRecordContext.jsx'
import App from './App.jsx'
import firebase from "firebase/compat/app"

const firebaseConfig = {
  apiKey: "AIzaSyCdLhIFPlvnkqJiQASjo3TK14TnGlkNwkk",
  authDomain: "test-6ab3a.firebaseapp.com",
  projectId: "test-6ab3a",
  storageBucket: "test-6ab3a.appspot.com",
  messagingSenderId: "920039713792",
  appId: "1:920039713792:web:f979ecedb627ec1e613ce5"
};

firebase.initializeApp(firebaseConfig)


ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <AdoptionContextProvider>
      <PetContextProvider>
        <AllDoctorContextProvider>
          <DoctorContextProvider>
            <AllPetOwnerContextProvider> 
              <BookingContextProvider>
                <LostPetsContextProvider>
                  <ConversationProvider>
                    <AllPetsContextProvider>
                      <InventoryItemsContextProvider>
                        <SocketContextProvider>
                          <SupplierContextProvider>
                            <SalesContextProvider>
                              <MedicalRecordContext>
                                <App />
                              </MedicalRecordContext>  
                            </SalesContextProvider>  
                          </SupplierContextProvider>  
                        </SocketContextProvider>    
                      </InventoryItemsContextProvider>  
                    </AllPetsContextProvider>  
                  </ConversationProvider>  
                </LostPetsContextProvider>
              </BookingContextProvider>
            </AllPetOwnerContextProvider>   
          </DoctorContextProvider>    
        </AllDoctorContextProvider>    
      </PetContextProvider>  
    </AdoptionContextProvider>    
  </UserContextProvider> 
);

