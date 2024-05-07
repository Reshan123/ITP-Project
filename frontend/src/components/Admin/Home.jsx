import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import Doctor from './components/Doctor/Doctor';
import PetOwners from './components/PetOwners/PetOwners';



import { useAllDocContext } from '../../hooks/useAllDoctorContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext';
import { useAdoptionContext } from '../../hooks/useAdoptionContext';

import InventoryItemDetails from './components/Inventory/InventoryItemDetails';
import InventoryItemForm from './components/Inventory/InventoryItemForm';
import InventoryItemUpdate from './components/Inventory/InventoryItemUpdate';
import CreateDoctor from './components/Doctor/CreateDoctor';
import UpdateDoctor from './components/Doctor/UpdateDoctor';
import AllForms from './components/Adoption/AllForms';
import ViewAdoptionForm from './components/Adoption/ViewAdoptionForm';


import './styles.css'
import LostPet from './components/LostPet/LostPet';
<<<<<<< Updated upstream

=======
import Booking from './components/Booking/Booking';
import BookingUpdate from './components/Booking/BookingUpdate';
import { useBookingContext } from '../../hooks/useBookingContext';
import { useSupplierContext } from "../../hooks/useSupplierContext"
import SupplierDetails from './components/Supplier/SupplierDetails';
import SupplierUpdateForm from './components/Supplier/SupplierUpdateForm';
import SupplierForm from './components/Supplier/SupplierForm'
import SalesHome from './components/Sales/SalesHome';
import SalesUpdateForm from './components/Sales/SalesUpdate';
>>>>>>> Stashed changes
const Home = () => {

    const navigate = useNavigate()


    const { doctors, dispatch: allDocDispatch } = useAllDocContext()

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()
    const { adoptionForms, dispatch: adoptionDispatch } = useAdoptionContext();
    useEffect(() => {
        if (!localStorage.getItem('adminUser')) {
            navigate('/admin/login')
        }
    }, [])

    useEffect(() => {
        const fetchAllData = async () => {
            try {
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


                //getAllAdoptionForms
                const allForms = await fetch('http://localhost:4000/api/adoption')
                const json = await allForms.json()

                if (!json.ok) {
                    throw Error(json.message)
                }
                adoptionDispatch({ type: 'SET_FORMS', payload: json })


            } catch (error) {
                console.log(error.message)
            }
        }
        fetchAllData()
    }, [])

    return (
        <>
            <NavBar />
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
                        <Route path='/LostPet' element={<LostPet />} />
<<<<<<< Updated upstream

=======
                        <Route path='/Booking' element={<Booking />} />
                        <Route path='/Booking/update/:id' element={<BookingUpdate />} />
                        <Route path='/Supplier' element={<SupplierDetails />} />
                        <Route path='/SupplierForm' element={<SupplierForm />} />
                        <Route path='/supplierUpdate/:id' element={<SupplierUpdateForm />} />
                        <Route path='/SalesHome' element={<SalesHome />} />
                        <Route path='/SalesUpdate/:id' element={<SalesUpdateForm />} />
>>>>>>> Stashed changes
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Home;