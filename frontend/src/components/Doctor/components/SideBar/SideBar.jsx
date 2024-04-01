import { NavLink } from 'react-router-dom';
import './styles.css'

const SideBar = () => {
    return ( 
        <div className="doctorPageSideBar">
            <div className="doctorSideBarLinksContainer">
                <NavLink to='/doctor/home'>Landing Page</NavLink>
                <br />
                <NavLink to='/doctor/home/pets'>All Pets</NavLink>
            </div>
        </div>
     );
}
 
export default SideBar;