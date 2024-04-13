import { IoPaw } from "react-icons/io5";
import './styles.css'
import { useDoctorContext } from "../../../../hooks/useDoctorContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const {doctor, dispatch} = useDoctorContext()

    const navigate = useNavigate()

    const logOutUser = () => {
        localStorage.removeItem('doctor')
        dispatch({type:"LOGOUT"})
        navigate('/doctor/login')
    }

    return ( 
        <div className="doctorNavBar">
            <div className="doctorNavLogo">
                <IoPaw />
            </div>
            <div className="doctorNavTitle">Doctor Dashboard</div>
            <div className="doctorProfile">
                <div className="doctorNavUsername">{doctor && doctor.username}</div>
                <button onClick={logOutUser}>Log Out</button>
            </div>
        </div>
     );
}
 
export default NavBar;