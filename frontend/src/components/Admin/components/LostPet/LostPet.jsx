import { useEffect } from "react"
import { useLostPetsContext } from "../../../../hooks/useLostPetsContext"

const LostPet = () => {
    
    const {lostNotice,dispatch} = useLostPetsContext()

    useEffect(()=>{
        const fetchNotices = async () =>{
            //this returns a object
            const response = await fetch('http://localhost:4000/api/lostPetNotice')
            //converting to json format
            const json =await response.json()

            if(response.ok){
                //setLostNotice(json)
                dispatch({type:'SET_LOSTPETNOTICE',payload:json})
            }
        }
        fetchNotices()
    },[])

    const formattedDate = (createdAt) => {
        const date = new Date(createdAt.split('T')[0]);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const acceptPost = async (noticeId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/lostPetNotice/${noticeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Confirmed' }),
            });
            if (response.ok) {
                // Update the status in the local state
                const updatedNotices = lostNotice.map(notice => {
                    if (notice._id === noticeId) {
                        return { ...notice, status: 'Confirmed' };
                    }
                    return notice;
                });
                dispatch({ type: 'SET_LOSTPETNOTICE', payload: updatedNotices });
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const discardPost = async (noticeId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/lostPetNotice/${noticeId}`, {
                method: 'DELETE',
            });
            const json = await response.json()

            if(response.ok){

            //setNotices(notices.filter((notice)=> notice._id !== id)) //not deleted items will br filtered
            dispatch({type:'DELETE_NOTICE',payload:json})
            } else {
                console.error('Failed to discard notice');
            }
        } catch (error) {
            console.error('Error discarding notice:', error);
        }
    };


    return ( 
        <div className="adminframe">
                <div className="container">
                    {/*mapping thought the notices only if ther are notices*/ }
                    {lostNotice && lostNotice.map((notice)=>(
                        <div className= "lostpetdetails" >
                                
                
                        {/* Display the images */}
                            {notice.image && notice.image.map((imageSrc, index) => (
                                <img key={index} src={imageSrc} alt={`Pet ${index + 1}`} />
                            ))} 
        
                        <h4>{notice.petName}</h4>
                        {/* <p><strong>Owner Name: </strong>{notice.ownerName}</p>*/}
                        <p><strong> </strong>{notice.breed}</p>
                        <p><strong>Description: </strong>{notice.description}</p>
                        <p><strong>ContactNo: </strong>{notice.contactNo}</p>
                        <p><strong>Location: </strong>{notice.location}</p>
                        {/** <p><strong>Email: </strong>{notice.email}</p>*/}
                        <p className='createdAt'>{formattedDate(notice.createdAt)}</p>
                        
                        <button onClick={() => acceptPost(notice._id) }className="acceptbutton">Accept</button>
                        <button onClick={() => discardPost(notice._id)}className="discardbutton">Discard</button>
                    </div>
                    ))}
                </div>
            </div>
     );
}
 
export default LostPet;