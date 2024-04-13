import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useAllPetsContext } from "../../../../hooks/useAllPetsContext";
import { useNavigate } from 'react-router';
import './styles.css'

const AllPets = () => {

    const navigate = useNavigate()
    const {pets, dispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 

    const deletePet = async (petID) => {
        const confimred = confirm("Are you sure?")
        if(confimred){
            try {
                const config = {
                    method: 'DELETE',
                }
                const response = await fetch(`http://localhost:4000/api/pet/deletePetFromID/${petID}`, config);
                const json = await response.json()
    
                if(!response.ok){
                    throw Error(json.message)
                }
    
                dispatch({type: "DELETE PET", payload:petID})
                navigate('/doctor/home/pets')
    
    
            } catch (error){
                console.log(error.message)
            }
        }
    }


    return ( 
        <>
            <div className="allPetsPage">
                <div className="allPetsHeader">
                    <p>All Pets Information</p>
                    <div>
                        <input type="text" placeholder='Search Text' />
                        <button>Print</button>
                        <button onClick={() => navigate('/doctor/home/createpet')}>Add Pets</button>
                    </div>
                </div>
                <hr />
                <div className="allPetCardsContainer">
                    <table className='allPetsTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Species</th>
                                <th>Breed</th>
                                <th>Gender</th>
                                <th>Owner Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets && pets.map(pet => (
                                <tr key={pet._id}>
                                    <td>{pet.petName}</td>
                                    <td>{pet.petAge}</td>
                                    <td>{pet.petSpecies}</td>
                                    <td>{pet.petBreed}</td>
                                    <td>{pet.petGender}</td>
                                    <td>{petOwners.map(owner => ((pet.ownerID == owner._id) && owner.name))}</td>
                                    <td>
                                        <center>
                                            <button className='table-view-btn' >Medical Record</button>
                                            <button onClick={() => navigate(`/doctor/home/updatepet/${pet._id}`)} className='table-view-btn' >Update</button>
                                            <button onClick={() => deletePet(pet._id)} className='table-view-btn' >Delete</button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default AllPets;

{/*  <br /><br />
            */}