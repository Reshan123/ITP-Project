import {Routes, Route} from 'react-router-dom'
import Home from "../components/PetOwner/Home/Home";
import LogIn from '../components/PetOwner/LogIn/LogIn';
import SignIn from '../components/PetOwner/SignIn/SignIn';
import NavBar from '../components/PetOwner/NavBar/NavBar';
import Profile from '../components/PetOwner/Profile/Profile';
import ProfileUpdate from '../components/PetOwner/Profile/ProfileUpdate';
import { useState } from 'react';
import Store from '../components/PetOwner/Store/Store';

const PetOwner = () => {

    const [navBarBackgroundColor, setNavBarBackgroundColor] = useState("#E2929D")
    const [navBarColor, setNavBarColor] = useState("#FFF")

    return ( 
        <>
            <NavBar navBarColor={navBarColor} navBarBackgroundColor={navBarBackgroundColor} />
            <Routes>
                <Route path='/home' element={<Home setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/login' element={<LogIn setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/store' element={<Store setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/signin' element={<SignIn setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/profile' element={<Profile setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/profile/update' element={<ProfileUpdate setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
            </Routes>
        </>
     );
}
 
export default PetOwner;