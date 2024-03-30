import { IoPaw } from "react-icons/io5";
import './styles.css'

const NavBar = () => {

    const adminLogOut = () => {
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/home'
    }
    const username = JSON.parse(localStorage.getItem('adminUser'))

    return ( 
        <div className="adminNavBar">
            <div className="adminNavLogo">
                <IoPaw />
            </div>
            <div className="adminNavTitle">Admin Dashboard</div>
            <div className="adminProfile">
                <div className="adminNavUsername">{username && username.username}</div>
                <button onClick={adminLogOut}>Log Out</button>
            </div>
        </div>
     );
}
 
export default NavBar;