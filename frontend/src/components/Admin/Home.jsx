import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import Doctor from './components/Doctor/Doctor';
import PetOwners from './components/PetOwners/PetOwners';
import InventoryItemDetails from './components/Inventory/InventoryItemDetails';
import InventoryItemForm from './components/Inventory/InventoryItemForm';
import InventoryItemUpdate from './components/Inventory/InventoryItemUpdate';
import CreateDoctor from './components/Doctor/CreateDoctor';
import UpdateDoctor from './components/Doctor/UpdateDoctor';

import { useAllDocContext } from '../../hooks/useAllDoctorContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext';

import './styles.css'

const Home = () => {

    const navigate = useNavigate()

    const { doctors, dispatch:allDocDispatch} = useAllDocContext()
    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()

    useEffect(() => {
        if(!localStorage.getItem('adminUser')){
            navigate('/admin/login')
        }
    }, [])

    useEffect(() => {
        const fetchAllData = async () => {
            try{
                //allDocData
                const allDocResponse = await fetch("http://localhost:4000/api/doctor/getAllDocs/")
                const allDocJson = await allDocResponse.json()
                
                if (!allDocResponse.ok){
                    throw Error(allDocResponse.message)
                }
                allDocDispatch({type:"LOAD", payload:allDocJson})

                //allPetOwnerData
                const allPetOwners = await fetch("http://localhost:4000/api/petOwner/getAllUsers/")
                const allPetOwnerJson = await allPetOwners.json()

                if (!allPetOwners.ok){
                    throw Error(allPetOwners.message)
                }
                petOwnerDispatch({type:"LOAD", payload: allPetOwnerJson})

            } catch (error){
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
                <div>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/Inventoryitemdetails' element={<InventoryItemDetails />} />
                        <Route path='/InventoryItemForm' element={<InventoryItemForm />} />
                        <Route path='/InventoryItemUpdate/:id' element={<InventoryItemUpdate />} />
                        <Route path='/doctor' element={<Doctor />} />
                        <Route path='/petowners' element={<PetOwners />} />
                        <Route path='/createdoctor' element={<CreateDoctor />} />
                        <Route path='/updatedoctor/:docID' element={<UpdateDoctor />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;