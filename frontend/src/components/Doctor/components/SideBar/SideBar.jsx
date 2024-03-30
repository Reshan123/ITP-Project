import { NavLink } from 'react-router-dom';
import './styles.css'

const SideBar = () => {
    return ( 
        <div className="doctorPageSideBar">
            <NavLink to='/doctor/home'>Landing Page</NavLink>
        </div>
     );
}
 
export default SideBar;