import { useAllPetOwnerContext } from '../../../../hooks/useAllPetOwnerContext'
import { useAllPetsContext } from "../../../../hooks/useAllPetsContext";

const AllPets = () => {

    const {pets, dispatch} = useAllPetsContext()
    const {petOwners, dispatch: allPetOwnersDispatch} = useAllPetOwnerContext() 

    return ( 
        <>
            <button>Add Pets</button> <br /><br />
            {pets && pets.map(pet => (
                <div key={pet._id}>
                    {pet.petName}<br />
                    {pet.petAge}<br />
                    {pet.petSpecies}<br />
                    {pet.petBreed}<br />
                    {pet.petGender}<br />
                    {petOwners.map(owner => ((pet.ownerID == owner._id) && owner.name))}<br />
                    <button>View Medical Record</button>
                    <button>update</button>
                    <button>delete</button>
                    <br />
                    <br />
                </div>
            ))}
        </>
     );
}
 
export default AllPets;