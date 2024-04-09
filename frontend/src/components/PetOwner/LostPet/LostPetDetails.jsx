import React from 'react'
import { useNavigate } from "react-router-dom"
const LostPetDetails = ({notice}) => {

    const navigate = useNavigate() 

    //making the date readable format
    const createdAt = notice.createdAt.split('T')[0]
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

  return (
        <>
        {notice.status === 'Confirmed' && (
            <div className= "lostpetdetails" >
                
                
                
                {/* Display the images */}
                    {notice.image && notice.image.map((imageSrc, index) => (
                        <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
                    ))} 

                <h4 className='lostpettext'>{notice.petName}</h4>
                {/* <p><strong>Owner Name: </strong>{notice.ownerName}</p>*/}
                <p className='lostpettext'><strong> </strong>{notice.breed}</p>
                <p className='lostpettext'><strong>Description: </strong>{notice.description}</p>
                <p className='lostpettext'><strong>ContactNo: </strong>{notice.contactNo}</p>
                <p className='lostpettext'><strong>Location: </strong>{notice.location}</p>
                {/** <p><strong>Email: </strong>{notice.email}</p>*/}
                <p className='createdAt'>{formattedDate}</p>
                
                <button onClick={()=>{navigate('/pet/lostpetnotices/alldetails',{ state:notice })}}>View Details</button>
                
                
            </div>

        )}
    </>   
  )
}

export default LostPetDetails