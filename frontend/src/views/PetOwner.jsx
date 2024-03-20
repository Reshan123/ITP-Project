import { Routes, Route } from 'react-router-dom'
import Home from "../components/PetOwner/Home/Home";
import LogIn from '../components/PetOwner/LogIn/LogIn';
import SignIn from '../components/PetOwner/SignIn/SignIn';
import NavBar from '../components/PetOwner/NavBar/NavBar';
import Profile from '../components/PetOwner/Profile/Profile';
import ProfileUpdate from '../components/PetOwner/Profile/ProfileUpdate';
import { useEffect, useState } from 'react';
import Store from '../components/PetOwner/Store/Store';
import AdoptPet from '../components/PetOwner/AdoptPet/AdoptPet';
import CreateAdoptionForm from '../components/PetOwner/AdoptPet/CreateAdoptionForm';
import { usePetContext } from '../hooks/usePetContext'
import { useUserContext } from '../hooks/userContextHook'
import LostPet from '../components/PetOwner/LostPet/LostPet';

const PetOwner = () => {

    const [navBarBackgroundColor, setNavBarBackgroundColor] = useState("#E2929D")
    const [navBarColor, setNavBarColor] = useState("#FFF")

    const {pets, dispatch: petDispatch} = usePetContext()
    const {user, dispatch: userDispatch} = useUserContext()

    useEffect(()=> {
        const fetchProfileData = async () => {
            
            const config = {
                headers: {
                    "authorization": `Bearer ${user.userToken}`
                }
            }

            try{
                const petDetailsResponse = await fetch("http://localhost:4000/api/pet/getOneOwnerPets/", config)

                if (!petDetailsResponse.ok){
                    throw Error("Invalid Token")
                }
                const petDetailsJson = await petDetailsResponse.json()
                petDispatch({type:"LOAD", payload:petDetailsJson.message})

            } catch (error){
                console.log("pet owner page error", error)
            }
        }
        
        if (user){
            fetchProfileData()
        }

    },[user])

    return (
        <>
            <NavBar navBarColor={navBarColor} navBarBackgroundColor={navBarBackgroundColor} />
            <Routes>
                <Route path='/home' element={<Home setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/login' element={<LogIn setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/store' element={<Store setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/adopt' element={<AdoptPet setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/adopt/adoptionForm' element={<CreateAdoptionForm setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/signin' element={<SignIn setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/lostpetnotices' element={<LostPet setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/profile' element={<Profile setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
                <Route path='/profile/update' element={<ProfileUpdate setNavBarColor={setNavBarColor} setNavBarBackgroundColor={setNavBarBackgroundColor} />} />
            </Routes>
        </>
    );
}

export default PetOwner;