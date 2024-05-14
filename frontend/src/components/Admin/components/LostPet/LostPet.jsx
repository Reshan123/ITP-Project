import { useEffect, useState } from "react";
import { useLostPetsContext } from "../../../../hooks/useLostPetsContext";
import "./styles.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {  Button, Modal } from "antd";

const LostPet = () => {
  const { lostNotice, dispatch } = useLostPetsContext();
  const [filter, setFilter] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalRecord, setModalRecord] = useState(null);

  const showModal = (record) => {
    setModalRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
    
  }

  const discardPost = async (noticeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
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
    }
      
  };

  //download report
  const downloadReport = () => {
  const table = document.getElementById("lostpet-table"); // Get the table element
  if (!table) {
    console.error("Table element not found.");
    return;
  }

  const tbody = table.querySelector("tbody"); // Get the tbody element
  if (!tbody) {
    console.error("Table body not found.");
    return;
  }

  const thead = table.querySelector("thead"); // Get the thead element
  if (!thead) {
    console.error("Table header not found.");
    return;
  }

  const actionColumnIndex = 10; // Specify the index of the actions column

  // Remove the header cell corresponding to the actions column
  const headerRow = thead.querySelector("tr");
  if (headerRow) {
    const headerCell = headerRow.cells[actionColumnIndex];
    if (headerCell) {
      headerCell.parentNode.removeChild(headerCell); // Remove the header cell
    }
  }

  // Remove the actions column from each row in the tbody
  const rows = tbody.getElementsByTagName("tr"); // Get all rows in the tbody
  for (let i = 0; i < rows.length; i++) {
    const cellsInRow = rows[i].getElementsByTagName("td"); // Get all cells in the current row
    if (cellsInRow.length > actionColumnIndex) {
      // Check if the row has the actions column
      const cellToRemove = cellsInRow[actionColumnIndex];
      cellToRemove.parentNode.removeChild(cellToRemove); // Remove the cell
    }
  }

  // Generate PDF from the modified table
  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgHeight = (canvas.height * 208) / canvas.width;

    // Add title in bold
    const title = "Lost Pets Notice Report";
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(title, 10, 10);

    // Add current date
    const date = new Date().toLocaleDateString("en-US");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Date: ${date}`, 10, 20);

    // Add the image to the PDF
    pdf.addImage(imgData, 10, 30, 190, imgHeight);
    pdf.save("LostPetsReport.pdf");
    
    
    

    // Refresh the page
    window.location.reload();
  });
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
          <button onClick={downloadReport}>Download Report</button>
        </div>
      </div>
      <hr />
      <div className="lostpet-table" id="lostpet-table">
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
                      <button
                        className="table-view-btn"
                        onClick={() => showModal(notice)}
                      >
                        View Image
                      </button>

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

      <Modal
        title="Pet Image"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {modalRecord && (
          <div>
            <img
              src={modalRecord.image}
              alt="Pet"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LostPet;
