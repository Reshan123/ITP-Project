import { NavLink } from 'react-router-dom';
import './styles.css'

const SideBar = () => {
    return ( 
        <div className="doctorPageSideBar">
            <div className="doctorSideBarLinksContainer">
                <NavLink to='/doctor/home/landingpage' className='doctorSideBarLink'>
                    <div className="linkText">Landing Page</div>
                </NavLink>
                <br />
                <NavLink to='/doctor/home/pets' className='doctorSideBarLink'>
                    <div className="linkText">All Pets</div>
                </NavLink>
            </div>
        </div>
     );
}
 
export default SideBar;