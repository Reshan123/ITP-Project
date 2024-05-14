import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import { useEffect } from "react";
import SideBar from './components/SideBar/SideBar'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import AllPets from './components/AllPets/AllPets';
import UpdatePet from './components/AllPets/UpdatePet';

import { useDoctorContext } from '../../hooks/useDoctorContext'
import { useAllPetsContext } from '../../hooks/useAllPetsContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext'

import './styles.css'
import CreatePet from './components/AllPets/CreatePet';
import { Booking } from './components/Booking/Booking';
import { useBookingContext } from '../../hooks/useBookingContext';

const Home = () => {

    const {doctor, dispatch} = useDoctorContext()
    const {pets, dispatch: allPetsDispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 
    const { bookings, dispatch: bookingDispatch } = useBookingContext()
    const navigate = useNavigate()

    useEffect(()=> {
        const checkUserValid = async () => {
            try {
                const config = {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${doctor.userToken}`
                    }
                }
                const response = await fetch('http://localhost:4000/api/doctor/verifyToken', config)

                if (!response.ok){
                    localStorage.removeItem('doctor')
                    dispatch({ type: "LOGOUT" })
                    navigate('/doctor/login')
                }
                if(response.ok){
                    console.log("Token Valid")
                }
            } catch(error){
                console.log(error.message)
            }
        }
        if (doctor){
            checkUserValid()
        }
    }, [doctor])

    useEffect(() => {
        if (!doctor){
            navigate('/doctor/login')
        }

        const fetchData = async () => {
            try{

                //bookings

                const bookingResponse = await fetch("http://localhost:4000/api/bookings/");
      
                if (!bookingResponse.ok) {
                    throw Error(bookingResponse.message);
                }
        
                const bookingJson = await bookingResponse.json();
        
                bookingDispatch({ type: 'SET_BOOKINGS', payload: bookingJson });

                //get all pet data
                const allPetsResponse = await fetch("http://localhost:4000/api/pet/getAllPets/")
                const allPetsJson = await allPetsResponse.json()

                if(!allPetsResponse.ok){
                    throw Error(allPetsJson.message)
                }

                allPetsDispatch({type:"LOAD", payload: allPetsJson.message})

                //get all pet owner data
                const allPetOwnersResponse = await fetch("http://localhost:4000/api/petOwner/getAllUsers/")
                const allPetOwnersJson = await allPetOwnersResponse.json()

                if(!allPetOwnersResponse.ok){
                    throw Error(allPetOwnersJson.message)
                }
                allPetOwnersDispatch({type:"LOAD", payload: allPetOwnersJson})

            } catch (error){
                console.log(error.message)
            }
        }

        fetchData()


    }, [doctor])


    return ( 
        <>
            {/* <NavBar /> */}
            <div className="doctorPageMainContainer">
                <SideBar />
                <div className='doctorPages'>
                    <Routes>
                    <Route path='/' element={<Navigate to='landingpage' />} />
                        <Route path='/landingpage' element={<LandingPage />} />
                        <Route path='/pets' element={<AllPets />} />
                        <Route path='/createpet' element={<CreatePet />} />
                        <Route path='/updatepet/:petID' element={<UpdatePet />} />
                        <Route path='/bookings' element={<Booking />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;