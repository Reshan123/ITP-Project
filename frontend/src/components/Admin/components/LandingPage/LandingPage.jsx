import './styles.css'

const LandingPage = () => {

    const adminLogOut = () => {
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/home'
    }

    return ( 
        <div className="landingPage">
            <div className="landingPagesHeader">
                <p>Admin Dashboard</p>
                <button onClick={adminLogOut}>Log Out</button>
            </div>
            <hr />
        </div>
     );
}
 
export default LandingPage;