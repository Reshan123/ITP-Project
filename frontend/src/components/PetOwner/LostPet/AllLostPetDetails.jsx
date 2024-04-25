import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const AllLostPetDetails = ({navBarProps}) => {

    navBarProps("#FFF", "#B799D1")
    const navigate = useNavigate()
  
    const location = useLocation()

  return (
    <div className="container2">
      <div className="allpetdetails">
        {location.state.image &&
          location.state.image.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
          ))}
        <div className="allpetdetailstext-container">
          <h4 className="allpetdetailstext">{location.state.petName}</h4>

          <p className="allpetdetailstext">
            <strong>Owner Name:</strong>
            {location.state.ownerName}
          </p>
          <p className="allpetdetailstext">
            <strong>Location:</strong>
            {location.state.location}
          </p>
          <p className="allpetdetailstext">
            <strong>Gender:</strong>
            {location.state.gender}
          </p>
          <p className="allpetdetailstext">
            <strong>Age:</strong>
            {location.state.age}
          </p>
          <p className="allpetdetailstext">
            <strong>Breed:</strong>
            {location.state.breed}
          </p>
          <p className="allpetdetailstext">
            <strong>ContactNo:</strong>
            {location.state.contactNo}
          </p>
          <p className="allpetdetailstext">
            <strong>Email:</strong>
            {location.state.email}
          </p>
          <p className="allpetdetailstext">
            <strong>Description:</strong>
            {location.state.description}
          </p>

          <button
            className="allpetdetailsbtn"
            onClick={() => {
              console.log("Ownerid to be passed:", location.state.owner_id);
              navigate("/pet/lostpetnotices/messages", {
                state: { Ownerid: location.state.owner_id },
              });
              console.log("Ownerid to be passed2:", location.state.owner_id);
            }}
          >
            Send message
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default AllLostPetDetails