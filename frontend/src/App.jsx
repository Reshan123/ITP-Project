import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PetOwner from './views/PetOwner'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/pet/home" />} />
          <Route path='/pet/*' element={<PetOwner />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
