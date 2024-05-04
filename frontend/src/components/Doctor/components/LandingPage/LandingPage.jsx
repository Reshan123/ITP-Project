import { useDoctorContext } from '../../../../hooks/useDoctorContext'
import { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

const LandingPage = () => {

    const [doctorAvailability, setDoctorAvailability] = useState(false)
    const {doctor, dispatch} = useDoctorContext()

    const [events, setEvents] = useState([]);

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
                  end: new Date(new Date(event.start_time).getTime() + 30 * 60000), // End time is start time + 30 minutes
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

    return ( 
        <>
            <div>Availability :  <button onClick={() => changeAvailability()}>{doctorAvailability ? "Available" : "Unavailable"}</button></div>

            <div className="calendar-container">
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                    initialView={"dayGridMonth"}

                    headerToolbar={{
                    start: "dayGridMonth,timeGridWeek,timeGridDay",
                    center: "title",
                    end: "today,prev,next"
                    }}

                    height={"120vh"}
                    
                    events={events} // Pass events data to the FullCalendar component

                    eventTimeFormat={{ // Specify the time format for events
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: true // Show AM/PM indicator
                    }}
                />
            </div>
        </>
     );
}
 
export default LandingPage;