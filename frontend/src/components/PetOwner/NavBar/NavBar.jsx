import { NavLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useUserContext } from '../../../hooks/userContextHook';
import './styles.css';
import navLogo from './Images/logo.png'

const NavBar = ({ navBarColor }) => {

    const navigate = useNavigate()
    const {dispatch} = useUserContext()

    const logOutUser = () => {
        navigate('/pet/home')
        localStorage.removeItem('user')
        dispatch({type:"LOGOUT"})
    }

    const user = JSON.parse(localStorage.getItem('user'))

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return ( 
        <>
            {!user && (
                <nav style={{background: navBarColor}}>
                    <div className="navLogo">
                        <img src={navLogo} alt="" onClick={() => {scrollToTop(); navigate('/pet/home')}} />
                    </div>          
                    <div className="navMidContainer">
                        <NavLink to="">About Us</NavLink>
                        <HashLink to="/pet/Home#bookAppointments">Book an Appointment</HashLink>
                        <NavLink to="">Store</NavLink>
                        <NavLink to="">Adobt a pet</NavLink>
                    </div>
                    <div className="navLogin">
                        <NavLink to="/pet/login">Login</NavLink>
                    </div>
                </nav>
            )}
            {user && (
                <nav>
                <div className="navLogo">
                    <img src={navLogo} alt="" onClick={() => navigate('/pet/home')} />
                </div>          
                <div className="navMidContainer">
                    <NavLink to="">About Us</NavLink>
                    <NavLink to="">Book an Appointment</NavLink>
                    <NavLink to="">Store</NavLink>
                    <NavLink to="">Adobt a pet</NavLink>
                </div>
                <div className="navLogin">
                    <NavLink to="/pet/profile">Profile</NavLink>
                </div>
            </nav>
            )}
        </>    
    );
}
 
export default NavBar;