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
                return ((petOwner.name.startsWith(searchQuery))  ||
                        (petOwner.email.startsWith(searchQuery)))
            })
            setCurrentlyDisplayedItems(filteredList)
        }
    }, [searchQuery])

    return ( 
        <div className="allPetOwnerPage">
            <div className="allPetOwnerHeader">
                <p>All Pet Owner Details</p>
                <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <hr />
            <div className="allPetOwnerCardContainer">
                <table className="allPetOwnerTable">
                    <thead>
                        <tr className="allPetOwnerTableHeading">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {currentlyDisplayedItem && currentlyDisplayedItem.map(petOwner => (
                        <tr key={petOwner._id} className="allPetOwnerTableRow">
                            <td>{petOwner.name}</td>
                            <td>{petOwner.email}</td>
                            <td>
                                <div className="buttonContainer">
                                    <button>delete</button>
                                </div>
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