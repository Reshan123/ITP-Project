import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import Doctor from './components/Doctor/Doctor';

import { useAllDocContext } from '../../hooks/useAllDoctorContext'

import './styles.css'

const Home = () => {

    const navigate = useNavigate()

    const {doctors, dispatch:allDocDispatch} = useAllDocContext()

    useEffect(() => {
        if(!localStorage.getItem('adminUser')){
            navigate('/admin/login')
        }
    }, [localStorage.getItem('adminUser')])

    useEffect(() => {
        const fetchDocData = async () => {
            try{
                const response = await fetch("http://localhost:4000/api/doctor/getAllDocs/")
                if (!response.ok){
                    throw Error(response.message)
                }
                const json = await response.json()
                allDocDispatch({type:"LOAD", payload:json})
            } catch (error){
                console.log(error.message)
            }
        }
        fetchDocData()
    }, [])

    return ( 
        <>
            <NavBar />
            <div className="adminPageMainContainer">
                <SideBar />
                <div>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/doctor' element={<Doctor />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;