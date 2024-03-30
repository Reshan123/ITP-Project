import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import Login from './Login'
import SideBar from './components/SideBar/SideBar'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'

import { useDoctorContext } from '../../hooks/useDoctorContext'

import './styles.css'

const Home = () => {

    const {doctor, dispatch} = useDoctorContext()
    const navigate = useNavigate()


    useEffect(() => {
        if (!doctor){
            navigate('/doctor/login')
        }
    }, [doctor])

    return ( 
        <>
            <NavBar />
            <div className="doctorPageMainContainer">
                <SideBar />
                <div>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                    </Routes>
                </div>
            </div>
        </>
     );
}
 
export default Home;