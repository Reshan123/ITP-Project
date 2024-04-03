import './styles.css'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="adminSideBar">
            <div className="adminSideBarLinksContainer">
                <NavLink to="/admin/home/">Home</NavLink>
                <br />
                <NavLink to="/admin/home/doctor">Doctor</NavLink>
                <br />
                <NavLink to='/admin/home/petowners'>Pet Owners</NavLink>
                <br />
                <NavLink to='/admin/home/Inventoryitemdetails'>Inventory</NavLink>
                <br />
                <NavLink to='/admin/home/adoption-forms'>Adoption Forms</NavLink>
            </div>
        </div>
    );
}

export default SideBar;