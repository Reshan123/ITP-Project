import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../hooks/userContextHook';
import './styles.css';

const NavBar = () => {

    const navigate = useNavigate()
    const {dispatch} = useUserContext()

    const logOutUser = () => {
        navigate('/pet/home')
        localStorage.removeItem('user')
        dispatch({type:"LOGOUT"})
    }

    const user = JSON.parse(localStorage.getItem('user'))
 
    return ( 
        <>
            {!user && (
                <nav>
                    <NavLink to='/pet/home' >Home</NavLink>            
                    <NavLink to='/pet/login' >LogIn</NavLink>            
                    <NavLink to='/pet/signin' >SignIn</NavLink>            
                </nav>
            )}
            {user && (
                <nav>
                    <NavLink to='/pet/home' >Home </NavLink>   
                    <NavLink to='/pet/profile' >Profile of {user.username} </NavLink>            
                    <NavLink onClick={logOutUser} >Logout</NavLink>         
                </nav>
            )}
        </>    
    );
}
 
export default NavBar;