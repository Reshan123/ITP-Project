import { useEffect } from "react";
import { useAllPetOwnerContext } from "../../../../hooks/useAllPetOwnerContext";

const PetOwners = () => {

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()

    useEffect

    return ( 
        <>
            <button>Add Doctors</button> <br /><br />
            {petOwners && petOwners.map(petOwner => (
                <>
                    {petOwner.name}<br />
                    {petOwner.email}<br />
                    <button>update</button>
                    <button>delete</button>
                    <br />
                    <br />
                </>
            ))}
        </>
     );
}
 
export default PetOwners;