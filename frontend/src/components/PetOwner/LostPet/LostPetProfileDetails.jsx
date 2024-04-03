import React from 'react'

const LostPetProfileDetails = ({notice}) => {

    //making the date readable format
    const createdAt = notice.createdAt.split('T')[0]
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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
        <button className='btn1'>View Details</button>
        <button className='btn2'>Update</button>
        <button className='btn3'>Delete</button>
    </div>
  )
}

export default LostPetProfileDetails