import {Routes, Route} from 'react-router-dom'
import Home from "../components/PetOwner/Home/Home";
import LogIn from '../components/PetOwner/LogIn/LogIn';
import SignIn from '../components/PetOwner/SignIn/SignIn';
import NavBar from '../components/PetOwner/NavBar/NavBar';
import Profile from '../components/PetOwner/Profile/Profile';
import ProfileUpdate from '../components/PetOwner/Profile/ProfileUpdate';
import { useState } from 'react';

const PetOwner = () => {

    const [navBarColor, setNavBarColor] = useState("#E2929D")

    return ( 
        <>
            <NavBar navBarColor={navBarColor} />
            <Routes>
                <Route path='/home' element={<Home setNavBarColor={setNavBarColor} />} />
                <Route path='/login' element={<LogIn setNavBarColor={setNavBarColor} />} />
                <Route path='/signin' element={<SignIn setNavBarColor={setNavBarColor} />} />
                <Route path='/profile' element={<Profile setNavBarColor={setNavBarColor} />} />
                <Route path='/profile/update' element={<ProfileUpdate setNavBarColor={setNavBarColor} />} />
            </Routes>
        </>
     );
}
 
export default PetOwner;