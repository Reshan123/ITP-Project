import { useDoctorContext } from '../../../../hooks/useDoctorContext'
import { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Modal } from 'antd';

const LandingPage = () => {

    const [doctorAvailability, setDoctorAvailability] = useState(false)
    const {doctor, dispatch} = useDoctorContext()

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        if (doctor){
            setDoctorAvailability(doctor.availability)
        }

        const fetchEvents = async () => {
            
            try {
              const response = await fetch(`http://localhost:4000/api/bookings/getDoctorBookings/${doctor && doctor.username}`);
      
              if (!response.ok) {
                throw new Error('Failed to fetch events');
              }
              
              const eventData = await response.json();
      
              const formattedEvents = eventData.map(event => ({
                  title: `${event.pet_name} - ${event.pet_species}`, 
                  start: event.start_time,
                  end: new Date(new Date(event.start_time).getTime() + 30 * 60000),
                  bookingId: event._id // End time is start time + 30 minutes
              }));
      
              setEvents(formattedEvents);
      
            } catch (error) {
              console.error('Error fetching events:', error);
            }
          };
      
        fetchEvents();

    }, [doctor])


    const changeAvailability = async () => {

        if(doctorAvailability){
            setDoctorAvailability(false)
        } else {
            setDoctorAvailability(true)
        }


        const config = {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${doctor.userToken}`
            }
        }
        try{
            const response = await fetch("http://localhost:4000/api/doctor/updateDoctorDetailsFromToken", config);
            const json = await response.json()

            if(!response.ok){
                throw Error(json.error)
            }

            // console.log(json)
            dispatch({type:"UPDATE AVAILABILITY", payload:doctorAvailability})

        } catch (error){
            console.log(error.message)
        }
    }

    const handleEventClick = async (clickInfo) => {
        setSelectedEvent(clickInfo.event);

        // Fetch additional details based on the booking ID
        const bookingId = clickInfo.event.extendedProps.bookingId;

        console.log(bookingId)

        try {
            const response = await fetch(`http://localhost:4000/api/bookings/getBooking/${bookingId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }
            const eventData = await response.json();
            setEventDetails(eventData); // Set additional event details
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
      };
    
      const handleModalCancel = () => {
        setIsModalVisible(false);
      };

    return ( 
        <>
            <div style={{
                fontWeight: 600,
                fontSize: '1.5rem',
                margin: '50px 0px 0px 50px'
            }}>Availability :  <button style={{
                padding: '10px 17px',
                border: '1px solid #00000045',
                borderRadius: '8px',

            }} onClick={() => changeAvailability()}>{doctorAvailability ? "Available" : "Unavailable"}</button></div>

            <div className="calendar-container">
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                    initialView={"dayGridMonth"}

                    headerToolbar={{
                    start: "dayGridMonth,timeGridWeek,timeGridDay",
                    center: "title",
                    end: "today,prev,next"
                    }}

                    height={"90vh"}
                    
                    events={events} // Pass events data to the FullCalendar component

                    eventTimeFormat={{ // Specify the time format for events
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: true // Show AM/PM indicator
                    }}

                    eventClick={handleEventClick} // Handle event click
                />
            </div>

            {/* Modal */}
            <Modal title="Booking Details" visible={isModalVisible} onCancel={handleModalCancel} footer={null} centered>
                {selectedEvent && (
                <div>
                    {eventDetails && (
                        <>
                            <p><strong>Pet Name:</strong> {eventDetails.pet_name}</p>
                            <p><strong>Pet Species:</strong> {eventDetails.pet_species}</p>
                            <p><strong>Pet Breed:</strong> {eventDetails.pet_breed}</p>
                            <p><strong>Owner Name:</strong> {eventDetails.owner_name}</p>
                            <p><strong>Owner Contact:</strong> {eventDetails.owner_contact}</p>
                            <p><strong>Booking Date & Time:</strong> {new Date(eventDetails.start_time).toLocaleString()}</p>
                        </>
                    )}
                </div>
                )}
            </Modal>

        </>
     );
}
 
export default LandingPage;