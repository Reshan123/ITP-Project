import './styles.css'
import WhoAreWeImage from './Images/whoarewe.png'
import ourServices from './Images/ourservices.png'
import { useState } from 'react'

const Home = ({ setNavBarColor }) => {

    setNavBarColor("#E2929D")
    const [inputValidity, setInputValidity] = useState(false)

    return ( 
        <>
            <div className="homeHero">
                <div className="homeHeroHeading">Paw Pulze</div>    
            </div> 
            <div className="homeWhoAreWe">
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
                        <input type="text" placeholder='Pet Species' />
                    </div>
                    <div className="homeBookAppointmentsFormInputWrapper">
                        <input type="text" placeholder='Pet Breed' />
                    </div>
                    <div className="homeBookAppointmentsFormInputWrapper">
                        <input type="text" placeholder='Doctor' />
                    </div>
                    <div className="homeBookAppointmentsFormInputWrapper">
                        <input type="text" placeholder='Start Time' />
                    </div>
                    <div className="homeBookAppointmentsFormInputWrapper">
                        <textarea name="description" id="description" cols="80" rows="10" placeholder='Description (optional) '></textarea>
                    </div>
                    <div className="homeBookAppointmentsFormButton">
                        {inputValidity && (<button type="submit">Book Appointment</button>)}
                        {!inputValidity && (<button type="submit" className="disabled" disabled>Book Appointment</button>)}
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default Home;