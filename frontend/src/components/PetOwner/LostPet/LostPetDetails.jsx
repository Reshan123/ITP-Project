import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEnvironment } from "react-icons/ai";
import { AiFillCarryOut } from "react-icons/ai";
const LostPetDetails = ({ notice }) => {
  const navigate = useNavigate();

  //making the date readable format
  const createdAt = notice.createdAt.split("T")[0];
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {notice.status === "Confirmed" && (
        <div className="lostpetdetails">
          {/* Display the images */}
          {notice.image &&
            notice.image.map((imageSrc, index) => (
              <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
            ))}
          <div class="location-container">
            <AiFillEnvironment className="location" />
            <p className="locationtext">{notice.location}</p>
          </div>

          <div className="date-container">
            <AiFillCarryOut className="date" />
            <p className="createdAt">{formattedDate}</p>
          </div>

          <h4 id="noticePetName" className="lostpettext">
            {notice.petName}
          </h4>
          {/* <p><strong>Owner Name: </strong>{notice.ownerName}</p>*/}
          <p className="lostpettext">
            
            {notice.breed}
          </p>
          <p className="lostpettext">
            <strong>Description: </strong>
            {notice.description}
          </p>
          {/* <p className="lostpettext">
            <strong>ContactNo: </strong>
            {notice.contactNo}
          </p> */}

          {/** <p><strong>Email: </strong>{notice.email}</p>*/}

          <button
            onClick={() => {
              navigate("/pet/lostpetnotices/alldetails", { state: notice });
            }}
          >
            View Details
          </button>
        </div>
      )}
    </>
  );
};

export default LostPetDetails;
