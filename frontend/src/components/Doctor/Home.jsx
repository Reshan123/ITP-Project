import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import SideBar from './components/SideBar/SideBar'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import AllPets from './components/AllPets/AllPets';

import { useDoctorContext } from '../../hooks/useDoctorContext'
import { useAllPetsContext } from '../../hooks/useAllPetsContext'
import { useAllPetOwnerContext } from '../../hooks/useAllPetOwnerContext'

import './styles.css'

const Home = () => {

    const {doctor, dispatch} = useDoctorContext()
    const {pets, dispatch: allPetsDispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 
    const navigate = useNavigate()


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
                <div>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/pets' element={<AllPets />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;