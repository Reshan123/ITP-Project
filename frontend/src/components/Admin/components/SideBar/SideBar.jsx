import './styles.css'
import { NavLink } from 'react-router-dom'
import { IoPaw } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const SideBar = () => {

    const username = JSON.parse(localStorage.getItem('adminUser'))


    return (
        <div className="adminSideBar">
            {/* <div className="adminSideBarLogo">
                <IoPaw />
            </div> */}
            <div className="adminSideBarProfile">
                <IoPaw />
                <div className="adminSideBarUsername">{username && username.username}</div>

            </div>
            <div className="adminSideBarLinksContainer">
                <NavLink to="/admin/home/LandingPage" className='adminSideBarLink' exact="true">
                    <div className='linkText'>Home</div>
                </NavLink>
                <br />

                <NavLink to="/admin/home/doctor" className='adminSideBarLink' exact="true">
                    <div className='linkText'>Doctor</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/petowners' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Pet Owners</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/Inventoryitemdetails' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Inventory</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/adoption-forms' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Adoption Forms</div>
                </NavLink>
                <br />
                <NavLink to='/admin/home/adoptionRequests' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Adoption Requests</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/LostPet' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Lost Pet Notices</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/Booking' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Appointment Bookings</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/Supplier' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Supplier</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/SalesHome' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Sales</div>
                </NavLink>
                <br />

                <NavLink to='/admin/home/MedicalRecord' className='adminSideBarLink' exact="true">
                    <div className='linkText'>Medical Record</div>
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;