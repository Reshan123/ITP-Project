import { NavLink, useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { useUserContext } from '../../../hooks/userContextHook';
import { IoPaw } from "react-icons/io5";
import './styles.css';

const NavBar = ({ navBarColor, navBarBackgroundColor }) => {    

    const navigate = useNavigate()
    const {user ,dispatch} = useUserContext()

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return ( 
        <>
            {!user && (
                <nav style={{background: navBarBackgroundColor}}>
                    <div className="navLogo">
                        <IoPaw onClick={() => {scrollToTop(); navigate('/pet/home')}} style={{color:navBarColor}} />
                    </div>          
                    <div className="navMidContainer">
                        <NavHashLink to="/pet/home#whoarewe"  style={{color: navBarColor}} end>About Us</NavHashLink>
                        
                        <NavHashLink to="/pet/home#bookAppointments" style={{color: navBarColor, border: `${navBarColor} 4px solid` }} className="buttonHoverAnimation" end>Book an Appointment</NavHashLink>
                        <NavLink to="/pet/store" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Store</NavLink>
                        <NavLink to="/pet/adopt" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Adopt a pet</NavLink>
                        <NavLink to="/pet/lostpetnotices" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Lost Pet Notices</NavLink>
                    </div>
                    <div className="navLogin">
                        <NavLink to="/pet/signin" className='NavLink buttonHoverAnimation' onClick={scrollToTop} style={{color: navBarColor, border: `${navBarColor} 4px solid` }} end>SignIn</NavLink>
                    </div>
                </nav>
            )}
            {user && (
                <nav style={{background: navBarBackgroundColor}}>
                    <div className="navLogo">
                        <IoPaw onClick={() => {scrollToTop(); navigate('/pet/home')}} style={{color:navBarColor}} />
                    </div>          
                    <div className="navMidContainer">
                        <NavHashLink to="/pet/home#whoarewe" style={{color: navBarColor}} end>About Us</NavHashLink>
                        
                        <NavHashLink to="/pet/home#bookAppointments" style={{color: navBarColor, border: `${navBarColor} 4px solid`}} className="buttonHoverAnimation" end>Book an Appointment</NavHashLink>
                        <NavLink to="/pet/store" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Store</NavLink>
                        <NavLink to="/pet/adopt" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Adopt a pet</NavLink>
                        <NavLink to="/pet/lostpetnotices" className="NavLink" style={{color: navBarColor}} onClick={scrollToTop} end>Lost Pet Notices</NavLink>
                    </div>
                    <div className="navLogin">
                        <NavLink to="/pet/profile" className='NavLink buttonHoverAnimation' onClick={scrollToTop} style={{color: navBarColor, border: `${navBarColor} 4px solid` }} end> {user.username}</NavLink>
                    </div>
                </nav>
            )}
        </>    
    );
}
 
export default NavBar;