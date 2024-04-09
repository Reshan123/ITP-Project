import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLostPetsContext } from '../../../hooks/useLostPetsContext';
const LostPetProfileDetails = ({notice}) => {

    const navigate = useNavigate();
    const{dispatch} = useLostPetsContext()

    //making the date readable format
    const createdAt = notice.createdAt.split('T')[0]
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDelete = async(id) =>{
        const response = await fetch('http://localhost:4000/api/lostPetNotice/' + id,{
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){

            //setNotices(notices.filter((notice)=> notice._id !== id)) //not deleted items will br filtered
            dispatch({type:'DELETE_NOTICE',payload:json})
            
            //toast.success("Notice deleted sucessfully")
            
        }
    }

  return (
    <div className= "lostprofiledetails" >
        

        {/* Display the images */}
            {notice.image && notice.image.map((imageSrc, index) => (
                <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
            ))} 
        <div className='details'>
            <h4>{notice.petName}</h4>
            {/* <p><strong>Owner Name: </strong>{notice.ownerName}</p>*/}
            <p><strong> Type:</strong>{notice.breed}</p>
             <p><strong>Age: </strong>{notice.age}</p>
            {/* <p><strong>Description: </strong>{notice.description}</p> */}
            <p><strong>Location: </strong>{notice.location}</p>
            <p><strong>Gender: </strong>{notice.gender}</p>
            <p><strong>Status: </strong>{notice.status}</p>
            <p className='createdAt'>{formattedDate}</p>
        </div>
        <button className='btn1' onClick={()=>{navigate('/pet/lostpetnotices/alldetails',{ state:notice });{window.scrollTo(0,0);}}}>View Details</button>
        <button className='btn2'onClick={() => {navigate('/pet/lostpetnotices/lostpetform/updatelostpet',{ state:notice, id:notice._id });{window.scrollTo(0,0);}}}  >Update</button>
        <button className='btn3' onClick={()=> handleDelete(notice._id)} >Delete</button>
    </div>
  )
}

export default LostPetProfileDetails