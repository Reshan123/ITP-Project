import { useEffect, useState } from "react";
import { useLostPetsContext } from "../../../../hooks/useLostPetsContext";
import "./styles.css";

const LostPet = () => {
  const { lostNotice, dispatch } = useLostPetsContext();
  const [filter, setFilter] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      //this returns a object
      const response = await fetch("http://localhost:4000/api/lostPetNotice");
      //converting to json format
      const json = await response.json();

      if (response.ok) {
        //setLostNotice(json)
        dispatch({ type: "SET_LOSTPETNOTICE", payload: json });
      }
    };
    fetchNotices();
  }, []);

  //run whenever the lostnotice array changes
  useEffect(() => {
    setFilteredNotices(lostNotice);
  }, [lostNotice]);

  const handleFilterChange = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);
    const filtered = lostNotice.filter(
      (notice) =>
        notice.ownerName.toLowerCase().includes(inputValue.toLowerCase()) ||
        notice.petName.toLowerCase().includes(inputValue.toLowerCase()) ||
        notice.age.toString().includes(inputValue) ||
        notice.location.toLowerCase().includes(inputValue.toLowerCase()) ||
        notice.email.toLowerCase().includes(inputValue.toLowerCase()) ||
        notice.contactNo === inputValue ||
        notice.gender.toLowerCase().includes(inputValue.toLowerCase()) ||
        notice.breed.toLowerCase().includes(inputValue.toLowerCase()) ||
        formattedDate(notice.createdAt)
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        notice.status.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredNotices(filtered);
  };

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt.split("T")[0]);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const acceptPost = async (noticeId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/lostPetNotice/${noticeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Confirmed" }),
        }
      );
      if (response.ok) {
        // Update the status in the local state
        const updatedNotices = lostNotice.map((notice) => {
          if (notice._id === noticeId) {
            return { ...notice, status: "Confirmed" };
          }
          return notice;
        });
        dispatch({ type: "SET_LOSTPETNOTICE", payload: updatedNotices });
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const discardPost = async (noticeId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/lostPetNotice/${noticeId}`,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();

      if (response.ok) {
        //setNotices(notices.filter((notice)=> notice._id !== id)) //not deleted items will br filtered
        dispatch({ type: "DELETE_NOTICE", payload: json });
      } else {
        console.error("Failed to discard notice");
      }
    } catch (error) {
      console.error("Error discarding notice:", error);
    }
  };

  return (
    <div className="lostpet-content">
      <div className="lostpetHeader">
        <p>Lost Pets Notice Details</p>
        <div>
          <input
            type="text"
            placeholder="Search "
            value={filter}
            onChange={handleFilterChange}
          />
          <button>Download Report</button>
        </div>
      </div>
      <div className="lostpet-table">
        <table className="lostpet-table-style">
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Pet Name</th>
              <th>Pet Age</th>
              <th>Pet Gender</th>
              {/* <th>Description</th> */}
              <th>Species</th>
              {/* <th width="8%">Image</th> */}
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* displaying the notices and highlighting the filtered ones */}
            {filteredNotices &&
              filteredNotices.map((notice) => (
                <tr key={notice._id}>
                  <td>
                    {filter &&
                    notice.ownerName
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.ownerName}</span>
                    ) : (
                      notice.ownerName
                    )}
                  </td>
                  <td>
                    {filter && notice.email.includes(filter) ? (
                      <span className="highlight">{notice.email}</span>
                    ) : (
                      notice.email
                    )}
                  </td>
                  <td>
                    {filter && notice.contactNo === filter ? (
                      <span className="highlight">{notice.contactNo}</span>
                    ) : (
                      notice.contactNo
                    )}
                  </td>
                  <td>
                    {filter &&
                    notice.location
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.location}</span>
                    ) : (
                      notice.location
                    )}
                  </td>
                  <td>
                    {filter &&
                    notice.petName
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.petName}</span>
                    ) : (
                      notice.petName
                    )}
                  </td>
                  <td>
                    {filter && notice.age.toString().includes(filter) ? (
                      <span className="highlight">{notice.age}</span>
                    ) : (
                      notice.age
                    )}
                  </td>
                  <td>
                    {filter &&
                    notice.gender
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.gender}</span>
                    ) : (
                      notice.gender
                    )}
                  </td>
                  {/* <td>{notice.description}</td> */}
                  <td>
                    {filter &&
                    notice.breed
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.breed}</span>
                    ) : (
                      notice.breed
                    )}
                  </td>
                  {/* <td>{notice.image && notice.image.map((imageSrc, index) => (
                                            <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} width={100} height={100}/>
                                        ))} </td> */}

                  <td>
                    {filter &&
                    formattedDate(notice.createdAt)
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">
                        {formattedDate(notice.createdAt)}
                      </span>
                    ) : (
                      formattedDate(notice.createdAt)
                    )}
                  </td>
                  <td>
                    {filter &&
                    notice.status
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <span className="highlight">{notice.status}</span>
                    ) : (
                      notice.status
                    )}
                  </td>
                  <td>
                    <center>
                      <button className="table-view-btn">View Image</button>
                      <button
                        onClick={() => acceptPost(notice._id)}
                        className="table-view-btn"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => discardPost(notice._id)}
                        className="table-view-btn"
                      >
                        Discard
                      </button>
                    </center>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LostPet;
