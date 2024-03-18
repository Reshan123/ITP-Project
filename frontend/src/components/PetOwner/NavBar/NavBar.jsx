import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';
import { useUserContext } from '../../../hooks/userContextHook';
import './styles.css';
import navLogo from './Images/logo.png'

const NavBar = ({ navBarColor }) => {

    const { hash } = useLocation();
    const isActive = (iHash) => {
        console.log(hash)
        console.log(iHash)
        return hash === iHash
    };

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
                        <NavLink to="/pet/aboutus" className="NavLink" end>About Us</NavLink>
                        
                        <NavHashLink to="/pet/home#bookAppointments" className={isActive("#bookAppointments") ? "buttonHoverAnimation activeHaslink": "buttonHoverAnimation"} end>Book an Appointment</NavHashLink>
                        <NavLink to="/pet/store" className="NavLink" end>Store</NavLink>
                        <NavLink to="/pet/adopt" className="NavLink" end>Adopt a pet</NavLink>
                    </div>
                    <div className="navLogin">
                        <NavLink to="/pet/login" className='NavLink buttonHoverAnimation' end>Login</NavLink>
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