import {Routes, Route} from 'react-router-dom'
import Home from "../components/PetOwner/Home/Home";
import LogIn from '../components/PetOwner/LogIn/LogIn';
import SignIn from '../components/PetOwner/SignIn/SignIn';
import NavBar from '../components/PetOwner/NavBar/NavBar';
import Profile from '../components/PetOwner/Profile/Profile';

const PetOwner = () => {
    return ( 
        <>
            <NavBar />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
     );
}
 
export default PetOwner;