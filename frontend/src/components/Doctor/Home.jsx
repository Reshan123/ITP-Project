import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import { useEffect } from "react";
import SideBar from './components/SideBar/SideBar'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import AllPets from './components/AllPets/AllPets';

import { useDoctorContext } from '../../hooks/useDoctorContext'
import { useAllPetsContext } from '../../hooks/useAllPetsContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext'

import './styles.css'
import CreatePet from './components/AllPets/CreatePet';

const Home = () => {

    const {doctor, dispatch} = useDoctorContext()
    const {pets, dispatch: allPetsDispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 
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
            <NavBar />
            <div className="doctorPageMainContainer">
                <SideBar />
                <div className='doctorPages'>
                    <Routes>
                    <Route path='/' element={<Navigate to='landingpage' />} />
                        <Route path='/landingpage' element={<LandingPage />} />
                        <Route path='/pets' element={<AllPets />} />
                        <Route path='/createpet' element={<CreatePet />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;