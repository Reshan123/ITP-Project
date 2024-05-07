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
                <br />

                <NavLink to='/admin/home/adoption-forms' className='adminSideBarLink' exact>
                    <div className='linkText'>Adoption Forms</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/LostPet' className='adminSideBarLink' exact>
                    <div className='linkText'>Lost Pet Notices</div>
                </NavLink>
<<<<<<< Updated upstream
=======
                <br />
                
                <NavLink to='/admin/home/Booking' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Appointment Bookings</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/Supplier' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Supplier</div>
                </NavLink>

                <NavLink to='/admin/home/SalesHome' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Sales</div>
                    </NavLink>
>>>>>>> Stashed changes
            </div>
        </div>
    );
}

export default SideBar;