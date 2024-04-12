import './styles.css'
import logo from './Images/logo.png'

const Footer = ({ footerBackground }) => {
    return ( 
        <footer style={{background: footerBackground}}>
            <div className="footerGridContainer">
                <div className="footerGridRow">
                    <div className="footerGridColoumn">
                        <div className="footerGridColumnLogo"><img src={logo} alt="AT DIGITAL" /></div>
                        <div className="footerGridColumnTextContainer">Your goal is our target. Not anything in between. We use online marketing platforms and tools to achieve single objective - your business results.</div>
                    </div>
                    <div className="footerGridColoumn">
                        <div className="footerGridColoumnListTitle">Our Technologies</div>
                        <div className="footerGridColoumnListItem">ReactJS</div>
                        <div className="footerGridColoumnListItem">Gatsby</div>
                        <div className="footerGridColoumnListItem">NextJS</div>
                        <div className="footerGridColoumnListItem">NodeJS</div>
                    </div>
                    <div className="footerGridColoumn">
                        <div className="footerGridColoumnListTitle">Our Services</div>
                        <div className="footerGridColoumnListItem">Social Media Marketing</div>
                        <div className="footerGridColoumnListItem">Web & Mobile App Development</div>
                        <div className="footerGridColoumnListItem">Data & Analytics</div>
                    </div>
                </div>
                <div className="footerGridRow">
                    <hr className='footerGridRowBottomHr' />
                    <div className='bottomContainer'>
                        <div className='bottomContainerText'>Privacy Policy</div>
                        <hr />
                        <div className='bottomContainerText'>Terms & Conditions</div>
                    </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;