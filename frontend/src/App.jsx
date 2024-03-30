import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PetOwner from './views/PetOwner'
import Admin from './views/Admin'
import Doctor from './views/Doctor'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/pet/home" />} />
          <Route path='/pet/*' element={<PetOwner />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/doctor/*' element={<Doctor />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
