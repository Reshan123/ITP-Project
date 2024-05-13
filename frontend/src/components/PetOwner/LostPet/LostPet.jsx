import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LostPetDetails from "./LostPetDetails"
import { useLostPetsContext } from "../../../hooks/useLostPetsContext"
import storeImage from './images/lostpetbanner5.png'

const LostPet = ({ navBarProps }) => {
    
      navBarProps("#FFF", "#B799D1", "#B799D1")

      const {lostNotice,dispatch} = useLostPetsContext()
      const navigate = useNavigate()  

      const createNotice= ()=>{
        navigate('/pet/lostpetnotices/lostpetform'); 
      }

      useEffect(()=>{
        const fetchNotices = async () =>{
            //this returns a object
            const response = await fetch('http://localhost:4000/api/lostPetNotice')
            //converting to json format
            const json =await response.json()

            if(response.ok){
                //setLostNotice(json)
                dispatch({type:'SET_LOSTPETNOTICE',payload:json})
            }
        }
        fetchNotices()
    },[])

    return (
      <>
        <div className="lostpet-landing-section">
          <div className="lostpet-content-wrapper">
            <div className="lostpet-image-section">
              <img src={storeImage} alt="" />
            </div>
            <div className="lostpet-text-section">
              <div className="lostpet-heading">
                Let's Help You Find Your Beloved Pet!
              </div>
              <div className="lostpet-paraText">
                Lost your furry friend? Don't fret, PawPulz is here to lend a
                paw! Our user-friendly platform makes finding lost pets a
                breeze. Join our community today.
              </div>
            </div>
          </div>
        </div>

        <div className="noticebtn-para">
          <p>
            Click the add notice to compose a detailed Lost Pet Notice and swiftly spread
            the word to our community, increasing the chances of reuniting you
            with your beloved companion.
          </p>
        </div>
        <div className="noticebtn">
          <button onClick={createNotice}>Add Notice</button>
        </div>
        <div className="frame">
          <div className="container">
            {/*mapping thought the notices only if ther are notices*/}
            {lostNotice &&
              lostNotice.map((notice) => (
                <LostPetDetails key={notice._id} notice={notice} />
              ))}
          </div>
        </div>
      </>
    );
}
 
export default LostPet;