import { useEffect, useState } from "react";
import { useAllPetOwnerContext } from "../../../../hooks/useAllPetOwnerContext";
import './styles.css'

const PetOwners = () => {

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()
    const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        setCurrentlyDisplayedItems(petOwners)
    }, [petOwners])
    
    useEffect(() => {
        if (petOwners){
            const filteredList = petOwners.filter(petOwner => { 
                return ((petOwner.name.toLowerCase().startsWith(searchQuery.toLowerCase()))  ||
                        (petOwner.email.toLowerCase().startsWith(searchQuery.toLowerCase())))
            })
            setCurrentlyDisplayedItems(filteredList)
        }
    }, [searchQuery])

    const deleteUser = async (userID) => {
        const confimred = confirm("Are you sure?")
        if(confimred){
            try {
                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/petOwner/deleteUserFromUserID/${userID}`, config);
                const json = await response.json()
    
                if(!response.ok){
                    throw Error(json.message)
                }
    
                petOwnerDispatch({type: "DELETE PETOWNER", payload:userID})
                navigate('/admin/home/petowners')
    
    
            } catch (error){
                console.log(error.message)
            }
        }
    }

    return ( 
        <div className="allPetOwnerPage">
            <div className="allPetOwnerHeader">
                <p>All Pet Owner Details</p>
                <div>
                    <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <button>Print</button>
                </div>
            </div>
            <hr />
            <div className="allPetOwnerCardContainer">
                <table className="allPetOwnerTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {currentlyDisplayedItem && currentlyDisplayedItem.map(petOwner => (
                        <tr key={petOwner._id}>
                            <td>{petOwner.name}</td>
                            <td>{petOwner.email}</td>
                            <td>
                                <center>
                                    <button onClick={() => deleteUser(petOwner._id)} className="table-view-btn">Delete</button>
                                </center>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default PetOwners;