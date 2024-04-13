import { Routes, Route } from 'react-router-dom'

import Home from '../components/Doctor/Home'
import Login from '../components/Doctor/Login'

const Doctor = () => {
    return ( 
        <>
            <Routes>
                <Route path='/home/*' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
     );
}
 
export default Doctor;