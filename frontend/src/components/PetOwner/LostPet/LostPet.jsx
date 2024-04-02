import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LostPetDetails from "./LostPetDetails"
import { useLostPetsContext } from "../../../hooks/useLostPetsContext"

const LostPet = ({ navBarProps }) => {
    
      navBarProps("#FFF", "#B799D1")

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
            <div className="noticebtn">
                <button onClick={createNotice}>Add Notice</button>
            </div>
            <div className="frame">
                <div className="container">
                    {/*mapping thought the notices only if ther are notices*/ }
                    {lostNotice && lostNotice.map((notice)=>(
                        <LostPetDetails key={notice._id} notice={notice}/>
                    ))}
                </div>
            </div>

        </>
        

        

    );
}
 
export default LostPet;