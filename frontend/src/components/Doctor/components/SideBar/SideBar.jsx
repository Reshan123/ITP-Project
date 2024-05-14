import { NavLink } from 'react-router-dom';
import { useDoctorContext } from "../../../../hooks/useDoctorContext";
import './styles.css'
import { IoPaw } from "react-icons/io5";


const SideBar = () => {

    const {doctor, dispatch} = useDoctorContext()


    return ( 
        <div className="doctorPageSideBar">
            <div className="doctorSideBarLogo">
                <IoPaw />
            </div>
            <div className="doctorProfile">
                <div className="doctorSideBarUsername">{doctor && doctor.username}</div>
            </div>
            <div className="doctorSideBarLinksContainer">
                <NavLink to='/doctor/home/landingpage' className='doctorSideBarLink'>
                    <div className="linkText">Landing Page</div>
                </NavLink>
                <br />
                <NavLink to='/doctor/home/pets' className='doctorSideBarLink'>
                    <div className="linkText">All Pets</div>
                </NavLink>
                <br/>
                <NavLink to='/doctor/home/bookings' className='doctorSideBarLink'>
                    <div className="linkText">Appointment Bookings</div>
                </NavLink>
            </div>
        </div>
     );
}
 
export default SideBar;