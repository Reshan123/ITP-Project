import './styles.css'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="adminSideBar">
            <div className="adminSideBarLinksContainer">
                <NavLink to="/admin/home/LandingPage" className='adminSideBarLink' exact>
                    <div className='linkText'>Home</div>
                </NavLink>
                <br />
                <NavLink to="/admin/home/doctor" className='adminSideBarLink' exact>
                    <div className='linkText'>Doctor</div>
                </NavLink>
                <br />
                <NavLink to='/admin/home/petowners' className='adminSideBarLink' exact>
                    <div className='linkText'>Pet Owners</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/Inventoryitemdetails' className='adminSideBarLink' exact>
                    <div className='linkText'>Inventory</div>
                </NavLink>

                <NavLink to='/admin/home/Inventoryitemdetails'>Inventory</NavLink>
                <br />
                <NavLink to='/admin/home/adoption-forms'>Adoption Forms</NavLink>

            </div>
        </div>
    );
}

export default SideBar;