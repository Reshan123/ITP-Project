import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import Doctor from './components/Doctor/Doctor';
import PetOwners from './components/PetOwners/PetOwners';



import { useAllDocContext } from '../../hooks/useAllDoctorContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext';
import { useAdoptionContext } from '../../hooks/useAdoptionContext';
import { useAdoptionRequestContext } from '../../hooks/useAdoptionRequestContext';
import InventoryItemDetails from './components/Inventory/InventoryItemDetails';
import InventoryItemForm from './components/Inventory/InventoryItemForm';
import InventoryItemUpdate from './components/Inventory/InventoryItemUpdate';
import CreateDoctor from './components/Doctor/CreateDoctor';
import UpdateDoctor from './components/Doctor/UpdateDoctor';
import AllForms from './components/Adoption/AllForms';
import { useInventoryItemsContext } from "../../hooks/useInventoryItemsContext"
import ViewAdoptionForm from './components/Adoption/ViewAdoptionForm';

import { useSalesContext } from "../../hooks/useSalesContext"
import './styles.css'
import LostPet from './components/LostPet/LostPet';
import Booking from './components/Booking/Booking';
import BookingUpdate from './components/Booking/BookingUpdate';
import { useBookingContext } from '../../hooks/useBookingContext';
import { useSupplierContext } from "../../hooks/useSupplierContext"
import SupplierDetails from './components/Supplier/SupplierDetails';
import SupplierUpdateForm from './components/Supplier/SupplierUpdateForm';
import SupplierForm from './components/Supplier/SupplierForm'
import SalesHome from './components/Sales/SalesHome';
import SalesUpdateForm from './components/Sales/SalesUpdate';

import MedicalRecord from './components/MedicalRecord/MedicalR';
import { useMedicalRecordContext } from '../../hooks/useMedicalRecordContext';
import MedicalUpdate from './components/MedicalRecord/MedicalUpdate';
import MedicalRecordForm from './components/MedicalRecord/MedicalRecordForm';
import AllRequestForms from './components/AdoptionRequests/AllRequestForms';

const Home = () => {

    const navigate = useNavigate()

    const { sales, dispatch: salesDispatch } = useSalesContext()

    const { inventoryitems, dispatch: inventoryDispatch } = useInventoryItemsContext()
    const { doctors, dispatch: allDocDispatch } = useAllDocContext()
    const { supplierDetails, dispatch: supplierDispatch } = useSupplierContext()

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()
    const { adoptionForms, dispatch: adoptionDispatch } = useAdoptionContext()

    const { bookings, dispatch: bookingDispatch } = useBookingContext()
    const { medicalRec, dispatch: medicalDispatch } = useMedicalRecordContext()

    const { requestForms, dispatch: requestDispatch } = useAdoptionRequestContext()


    useEffect(() => {
        if (!localStorage.getItem('adminUser')) {
            navigate('/admin/login')
        }
    }, [])


    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchInventoryItems()
    }, [])

    useEffect(() => {
        const fetchMedicalRecord = async () => {
            try {

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchMedicalRecord()
    }, [])

    useEffect(() => {
        const fetchAllData = async () => {
            try {

                //bookings

                const bookingResponse = await fetch("http://localhost:4000/api/bookings/");

                if (!bookingResponse.ok) {
                    throw Error(bookingResponse.message);
                }

                const bookingJson = await bookingResponse.json();

                bookingDispatch({ type: 'SET_BOOKINGS', payload: bookingJson });

                //supplier

                const supplierResponse = await fetch("http://localhost:4000/api/supplier/");

                if (!supplierResponse.ok) {
                    throw Error(supplierResponse.message);
                }

                const supplierJson = await supplierResponse.json();

                supplierDispatch({ type: 'SET_SUPPLIERS', payload: supplierJson });

                //allDocData
                const allDocResponse = await fetch("http://localhost:4000/api/doctor/getAllDocs/")
                const allDocJson = await allDocResponse.json()

                if (!allDocResponse.ok) {
                    throw Error(allDocResponse.message)
                }
                allDocDispatch({ type: "LOAD", payload: allDocJson })

                //allPetOwnerData
                const allPetOwners = await fetch("http://localhost:4000/api/petOwner/getAllUsers/")
                const allPetOwnerJson = await allPetOwners.json()

                if (!allPetOwners.ok) {
                    throw Error(allPetOwners.message)
                }
                petOwnerDispatch({ type: "LOAD", payload: allPetOwnerJson })


                //inventory
                const inventoryResponse = await fetch('http://localhost:4000/api/inventoryItems/')
                const inventoryJson = await inventoryResponse.json()

                if (inventoryResponse.ok) {
                    inventoryDispatch({ type: 'SET_ITEMS', payload: inventoryJson })
                }

                //medicalRecord
                const MedicalResponse = await fetch('http://localhost:4000/api/medicalRec/')
                const MedicalJson = await MedicalResponse.json()

                if (MedicalResponse.ok) {

                    medicalDispatch({ type: 'SET_MEDICAL_RECORD', payload: MedicalJson })
                }

                //getAllAdoptionForms
                const adoptionResponse = await fetch('http://localhost:4000/api/adoption')
                const adoptionJson = await adoptionResponse.json()

                if (adoptionResponse.ok) {
                    adoptionDispatch({ type: 'SET_FORMS', payload: adoptionJson })
                }

                //getAllRequestForms
                const requestResponse = await fetch('http://localhost:4000/api/adoptionRequest/getall')
                const requestJson = await requestResponse.json()

                if (requestResponse.ok) {
                    requestDispatch({ type: 'SET_FORMS', payload: requestJson })
                }

                //sales 
                const salesResponse = await fetch("http://localhost:4000/api/sales")
                const salesJson = await salesResponse.json()

                if (salesResponse.ok) {
                    salesDispatch({ type: 'SET_SALES', payload: salesJson })
                }



            } catch (error) {
                console.log(error)
            }
        }

        fetchAllData()

        // const fetchBookings = async () => {
        //     try {


        //     } catch (error) {
        //       console.log("Error fetching bookings:", error);
        //     }
        //   };

        // fetchBookings();
    }, [])

    return (
        <>
            {/* <NavBar /> */}
            <div className="adminPageMainContainer">
                <SideBar />
                <div className='pages'>
                    <Routes>
                        <Route path='/' element={<Navigate to='LandingPage' />} />
                        <Route path='/LandingPage' element={<LandingPage />} exact />
                        <Route path='/Inventoryitemdetails' element={<InventoryItemDetails />} />
                        <Route path='/InventoryItemForm' element={<InventoryItemForm />} />
                        <Route path='/InventoryItemUpdate/:itemID' element={<InventoryItemUpdate />} />
                        <Route path='/doctor' element={<Doctor />} />
                        <Route path='/petowners' element={<PetOwners />} />
                        <Route path='/createdoctor' element={<CreateDoctor />} />
                        <Route path='/updatedoctor/:docID' element={<UpdateDoctor />} />
                        <Route path='/adoption-forms' element={<AllForms />} />
                        <Route path='/adoption-forms/view-form/:id' element={<ViewAdoptionForm />} />
                        <Route path='/adoptionRequests' element={<AllRequestForms />} />
                        <Route path='/LostPet' element={<LostPet />} />
                        <Route path='/Booking' element={<Booking />} />
                        <Route path='/Booking/update/:id' element={<BookingUpdate />} />
                        <Route path='/Supplier' element={<SupplierDetails />} />
                        <Route path='/SupplierForm' element={<SupplierForm />} />
                        <Route path='/supplierUpdate/:id' element={<SupplierUpdateForm />} />
                        <Route path='/SalesHome' element={<SalesHome />} />
                        <Route path='/SalesUpdate/:id' element={<SalesUpdateForm />} />
                        <Route path='/MedicalRecord' element={<MedicalRecord />} />
                        <Route path='/MedicalRecord/update/:id' element={<MedicalUpdate />} />
                        <Route path='/MedicalRecord/add' element={<MedicalRecordForm />} />

                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Home;
