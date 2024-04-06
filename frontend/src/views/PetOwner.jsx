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
import LostNoticeForm from '../components/PetOwner/LostPet/LostNoticeForm';
import LostPetUpdateForm from '../components/PetOwner/LostPet/LostPetUpdateForm';
import AddPetForm from '../components/PetOwner/Profile/AddPetForm';
import UpdateForm from '../components/PetOwner/AdoptPet/UpdateForm';
import ViewForm from '../components/PetOwner/AdoptPet/ViewForm';
import UpdateBooking from '../components/PetOwner/Booking/UpdateBooking';

const PetOwner = () => {

    const [navBarBackgroundColor, setNavBarBackgroundColor] = useState("#E2929D")
    const [navBarColor, setNavBarColor] = useState("#FFF")

    const navBarProps = (backgroundColor, textColor) => {
        setNavBarBackgroundColor(backgroundColor)
        setNavBarColor(textColor)
    }

    const { user, dispatch: userDispatch } = useUserContext()
    const { pets, dispatch: petDispatch } = usePetContext()

    useEffect(() => {
        const fetchPetData = async () => {

            const config = {
                headers: {
                    "authorization": `Bearer ${user.userToken}`
                }
            }

            try {
                const petDetailsResponse = await fetch("http://localhost:4000/api/pet/getOneOwnerPets", config)

                if (!petDetailsResponse.ok) {
                    throw Error("Invalid Token")
                }
                const petDetailsJson = await petDetailsResponse.json()
                petDispatch({ type: "LOAD", payload: petDetailsJson.message })

            } catch (error) {
                console.log("pet owner page error", error)
            }
        }

        if (user) {
            fetchPetData()
        }

    }, [user])

    return (
        <>
            <NavBar navBarColor={navBarColor} navBarBackgroundColor={navBarBackgroundColor} />
            <Routes>
                <Route path='/home' element={<Home navBarProps={navBarProps} />} />
                <Route path='/login' element={<LogIn navBarProps={navBarProps} />} />
                <Route path='/store' element={<Store navBarProps={navBarProps} />} />
                <Route path='/adopt' element={<AdoptPet navBarProps={navBarProps} />} />
                <Route path='/adopt/adoptionForm' element={<CreateAdoptionForm navBarProps={navBarProps} />} />
                <Route path='/profile/adoption-form-update/:id' element={<UpdateForm />} />
                <Route path='/adopt/form-details/:id' element={<ViewForm navBarProps={navBarProps} />} />
                <Route path='/signin' element={<SignIn navBarProps={navBarProps} />} />
                <Route path='/lostpetnotices' element={<LostPet navBarProps={navBarProps} />} />
                <Route path='/lostpetnotices/lostpetform' element={<LostNoticeForm navBarProps={navBarProps} />} />
                <Route path='/lostpetnotices/lostpetform/updatelostpet' element={<LostPetUpdateForm navBarProps={navBarProps} />} />
                <Route path='/profile' element={<Profile navBarProps={navBarProps} />} />
                <Route path='/profile/update' element={<ProfileUpdate navBarProps={navBarProps} />} />
                <Route path='/profile/addpet' element={<AddPetForm navBarProps={navBarProps} />} />
                <Route path='/profile/booking-update/:id' element={<UpdateBooking navBarProps={navBarProps}/>} />
            </Routes>
        </>
    );
}

export default PetOwner;