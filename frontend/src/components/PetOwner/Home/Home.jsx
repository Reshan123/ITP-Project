import './styles.css'
import WhoAreWeImage from './Images/whoarewe.png'
import ourServices from './Images/ourservices.png'
import { useState, useEffect } from 'react'
import { useUserContext } from '../../../hooks/userContextHook'
import { usePetContext } from '../../../hooks/usePetContext'

const Home = ({ navBarProps }) => {

    navBarProps("#E2929D", "#FFF")

    const [inputValidity, setInputValidity] = useState(false)

    const { user, dispatch: userDispatch} = useUserContext()
    const { pets, dispatch: petDispatch } = usePetContext()
    const [selectedPet, setSelectedPet] = useState(null);

    //booking use states
    const [owner_name, setOwnerName] = useState('')
    const [owner_email, setOwnerEmail] = useState('')
    const [owner_contact, setOwnerContact] = useState('')
    const [pet_name, setPetName] = useState('')
    const [pet_species, setPetSpecies] = useState('')
    const [pet_breed, setPetBreed] = useState('')
    const [doctor, setDoctor] = useState('')
    const [start_time, setStartTime] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    //doctor use states
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    //booking submit function
    const handleSubmit = async(e) => {
        e.preventDefault()

        const booking = {owner_name,owner_email,owner_contact,pet_name,pet_species,pet_breed,doctor,start_time,description}

        const response = await fetch('http://localhost:4000/api/bookings', {
            method: 'POST',
            body: JSON.stringify(booking),
            headers: {
                'Content-Type':'application/json',
                "authorization": `Bearer ${user.userToken}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){

            setOwnerContact('')
            setPetName('')
            setPetSpecies('')
            setPetBreed('')
            setDoctor('')
            setStartTime('')
            setDescription('')
            console.log('New Booking Added', json)
        }
    }

    const handlePetSelect = async(petName) => {
        const selectedPet = pets.find(pet => pet.petName === petName);
        setPetName(petName)
        setSelectedPet(selectedPet);
        setPetSpecies(selectedPet.petSpecies)
    }

    useEffect(() => {
        //setting values
        if (user){
            setOwnerName(user.username)
            setOwnerEmail(user.email)
        }

        // Check if all required inputs are filled
        const isValid = owner_name && owner_email && owner_contact && pet_name && pet_species && doctor && start_time;

        setInputValidity(isValid);

        //fetching all available doctors
        const fetchDoctors = async () => {
            try {
              const response = await fetch('http://localhost:4000/api/doctor/availableDoctors');
              const data = await response.json();
              setDoctors(data);
              setLoading(false);
            } catch (error) {
              console.error(error);
            }
          };
      
        fetchDoctors();


        const fetchPetData = async () => {

            const config = {
                headers: {
                    'authorization': `Bearer ${user.userToken}`
                }
            }

            try {
                const petDetailsResponse = await fetch("http://localhost:4000/api/pet/getOneOwnerPets/", config)

                if (!petDetailsResponse.ok) {
                    throw Error("Invalid Token")
                }
                const petDetailsJson = await petDetailsResponse.json()

                petDispatch({ type: "LOAD", payload: petDetailsJson.message })

                console.log(pets)

            } catch (error) {
                console.log("pet owner page error", error)
            }
        }

        if (user) {
            fetchPetData()
        }

      }, [owner_name, owner_email, owner_contact, pet_name, pet_species, doctor, start_time, user]);




    return ( 
        <>
            <div className="homeHero">
                <div className="homeHeroHeading">PawPulz</div>    
            </div> 
            <div className="homeWhoAreWe" id='whoarewe'>
                <div className="homeWhoAreWeImage">
                    <img src={WhoAreWeImage} alt="" />
                </div>
                <div className="homeWhoAreWeText">
                    <div className="homeWhoAreWeTextHeading">
                        Who are We?
                    </div>
                    <div className="homeWhoAreWeTextBody">PawPulz is a new and improved pet care management system which offers a centralized hub. PawPulz is the ultimate companion in ensuring the health and happiness of your pets as well as their owners. <br /><br />Discover comprehensive pet care services at Pawpulz. From pet adoption to a fully-equipped online store, lost pet finder, and convenient appointment booking with medical record management, we've got all your pet needs covered with expertise and efficiency.
                    </div>
                    <div className="homeWhoAreWeTextButton">
                        <button>Join Us</button>
                    </div>
                </div>
            </div>
            <div className="homeOurServices">
                <div className="homeOurServicesHeading">Our Services</div>
                <div className="homeOurServicesContainer">
                    <div className="homeOurServicesElement">
                        <div className="homeOurServicesElementImage">
                            <img src={ourServices} alt="" />
                        </div>
                        <div className="homeOurServicesElementTextHeading">Appointment Booking</div>
                        <div className="homeOurServicesElementTextBody">Seamlessly schedule vet appointments with a choice of skilled doctors.</div>
                        <div className="homeOurServicesElementSeeMore">
                            <button>See More</button>
                        </div>
                    </div>
                    <hr />
                    <div className="homeOurServicesElement">
                        <div className="homeOurServicesElementImage">
                            <img src={ourServices} alt="" />
                        </div>
                        <div className="homeOurServicesElementTextHeading">Pet Adoption</div>
                        <div className="homeOurServicesElementTextBody">Pet Adoptation Find a new family member or offer your pet for adoption.</div>
                        <div className="homeOurServicesElementSeeMore">
                            <button>See More</button>
                        </div>
                    </div>
                    <hr />
                    <div className="homeOurServicesElement">
                        <div className="homeOurServicesElementImage">
                            <img src={ourServices} alt="" />
                        </div>
                        <div className="homeOurServicesElementTextHeading">Lost Pet Management</div>
                        <div className="homeOurServicesElementTextBody">Lost Pet Management Post about your lost pet to seek community assistance in their recovery.</div>
                        <div className="homeOurServicesElementSeeMore">
                            <button>See More</button>
                        </div>
                    </div>
                    <hr />
                    <div className="homeOurServicesElement">
                        <div className="homeOurServicesElementImage">
                            <img src={ourServices} alt="" />
                        </div>
                        <div className="homeOurServicesElementTextHeading">Pet Store</div>
                        <div className="homeOurServicesElementTextBody">Reserve a variety of pet essentials and treats online for your convenience.</div>
                        <div className="homeOurServicesElementSeeMore">
                            <button>See More</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeBookAppointments" id='bookAppointments'>
                <div className="homeBookAppointmentsHeading">Book Appointments</div>
                <div className="homeBookAppointmentsText">Take the first step towards your pet's well-being with Pawpulz Appointment Booking. Fill out the form below to schedule vet visits and manage medical records seamlessly, ensuring your furry friend receives top-notch care with ease and convenience.</div>
                {user ? (
                    <form className="homeBookAppointmentsForm" onSubmit={handleSubmit}>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Owner Name' onChange={(e) => setOwnerName(e.target.value)} value={user.username} required />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="email" placeholder='Owner Email' readOnly defaultValue={user.email} />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="number" placeholder='Owner Contact' onChange={(e) => setOwnerContact(e.target.value)} value ={owner_contact} required  />
                        </div>
                        {/* <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Name' onChange={(e) => setPetName(e.target.value)} value ={pet_name} required/>
                        </div> */}
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <select name="petName" value={selectedPet ? selectedPet.petName : ''} onChange={(e) => handlePetSelect(e.target.value)} required>
                                <option value="">Select a Pet</option>
                                {pets && pets.map(pet => (
                                    <option key={pet._id} value={pet.petName}>{pet.petName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Species' onChange={(e) => setPetSpecies(e.target.value)} value ={pet_species}  required/>
                        </div>
                        {/* <div className="homeBookAppointmentsFormInputWrapper">
                            <select name="pet_species" onChange={(e) => setPetSpecies(e.target.value)} required>
                                <option defaultValue="">Select a Species</option>
                                <option defaultValue="Dog">Dog</option>
                                <option defaultValue="Cat">Cat</option>
                                <option defaultValue="Bird">Bird</option>
                            </select>
                        </div> */}
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Breed' onChange={(e) => setPetBreed(e.target.value)} value ={pet_breed} />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <select name="doctor" onChange={(e) => setDoctor(e.target.value)} required>
                                <option value="">Select a Doctor</option>
                                {doctors.map(doctor => (
                                    <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
                                ))}
                                </select>
                            )}
                        </div>

                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="datetime-local" placeholder='Start Time' onChange={(e) => setStartTime(e.target.value)} value ={start_time} required />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <textarea name="description" id="description" cols="80" rows="10" placeholder='Description (optional) ' onChange={(e) => setDescription(e.target.value)} value ={description}></textarea>
                        </div>
                        <div className="homeBookAppointmentsFormButton">
                            {inputValidity && (<button type="submit">Book Appointment</button>)}
                            {!inputValidity && (<button type="submit" className="disabled" disabled>Book Appointment</button>)}
                        </div>
                    </form>
                ) : (
                    <form className="homeBookAppointmentsForm">
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Owner Name' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="email" placeholder='Owner Email' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="number" placeholder='Owner Contact' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Name' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <select name="pet_species" required>
                                {/* <option value="" disabled selected hidden>Pet Species</option>   */}
                                <option defaultValue="Dog">Dog</option>
                                <option defaultValue="Cat">Cat</option>
                                <option defaultValue="Bird">Bird</option>
                            </select>
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Pet Breed' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="text" placeholder='Doctor' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <input type="datetime-local" placeholder='Start Time' />
                        </div>
                        <div className="homeBookAppointmentsFormInputWrapper">
                            <textarea name="description" id="description" cols="80" rows="10" placeholder='Description (optional) '></textarea>
                        </div>
                        <div className="homeBookAppointmentsFormButton">
                            {inputValidity && (<button type="submit">Book Appointment</button>)}
                            {!inputValidity && (<button type="submit" className="disabled" disabled>Book Appointment</button>)}
                        </div>
                    </form>
                )}
            </div>
        </>
     );
}
 
export default Home;