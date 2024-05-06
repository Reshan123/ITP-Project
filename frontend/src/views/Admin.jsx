import { Routes, Route } from 'react-router-dom'

import Home from '../components/Admin/Home'
import Login from '../components/Admin/Login'

const Admin = () => {
    return ( 
        <>
            <Routes>
                <Route path='/home/*' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
     );
}
 
export default Admin;