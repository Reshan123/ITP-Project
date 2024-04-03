import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useAllPetsContext } from "../../../../hooks/useAllPetsContext";
import { useNavigate } from 'react-router';
import './styles.css'

const AllPets = () => {

    const navigate = useNavigate()
    const {pets, dispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 

    return ( 
        <>
            <div className="allPetsPage">
                <div className="allPetsHeader">
                    <p>All Pets Information</p>
                    <button onClick={() => navigate('/doctor/home/createpet')}>Add Pets</button>
                </div>
                <hr />
                <div className="allPetCardsContainer">
                    {pets && pets.map(pet => (
                        <div className="allPetsCard" key={pet._id}>
                            <div className='petName'>Name: <span>{pet.petName}</span></div>
                            <div className='petAge'>Age: <span>{pet.petAge}</span></div>
                            <div className='petSpecies'>Species: <span>{pet.petSpecies}</span></div>
                            <div className='petBreed'>Breed: <span>{pet.petBreed}</span></div>
                            <div className='petGender'>Gender: <span>{pet.petGender}</span></div>
                            <div className='petOwner'>Owner name: {petOwners.map(owner => ((pet.ownerID == owner._id) && owner.name))}</div>
                            <div className="buttonContainer">
                                <button>View Medical Record</button>
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default AllPets;

{/*  <br /><br />
            */}