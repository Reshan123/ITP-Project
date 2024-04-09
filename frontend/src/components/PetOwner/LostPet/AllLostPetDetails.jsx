import React from 'react'
import { useLocation } from 'react-router-dom'

const AllLostPetDetails = ({navBarProps}) => {

    navBarProps("#FFF", "#B799D1")

    const location = useLocation()

  return (
    <div className='container2'>
        <div className='allpetdetails'>
        {location.state.image && location.state.image.map((imageSrc, index) => (
                    <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
                ))} 
            <h4 className='allpetdetailstext'>{location.state.petName}</h4>
            <button className='allpetdetailsbtn'>Send message</button>
            <p className='allpetdetailstext'><strong>Owner Name:</strong>{location.state.ownerName}</p>
            <p className='allpetdetailstext'><strong>Location:</strong>{location.state.location}</p>
            <p className='allpetdetailstext'><strong>Gender:</strong>{location.state.gender}</p>
            <p className='allpetdetailstext'><strong>Age:</strong>{location.state.age}</p>
            <p className='allpetdetailstext'><strong>Breed:</strong>{location.state.breed}</p>
            <p className='allpetdetailstext'><strong>ContactNo:</strong>{location.state.contactNo}</p>
            <p className='allpetdetailstext'><strong>Email:</strong>{location.state.email}</p>
            <p className='allpetdetailstext'><strong>Description:</strong>{location.state.description}</p>
        </div>
    </div>
  )
}

export default AllLostPetDetails