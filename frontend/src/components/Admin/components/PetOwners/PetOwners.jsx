import { useEffect } from "react";
import { useAllPetOwnerContext } from "../../../../hooks/useAllPetOwnerContext";
import './styles.css'

const PetOwners = () => {

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()

    useEffect

    return ( 
        <div className="allPetOwnerPage">
            {petOwners && petOwners.map(petOwner => (
                <>
                    {petOwner.name}<br />
                    {petOwner.email}<br />
                    <button>delete</button>
                    <br />
                    <br />
                </>
            ))}
        </div>
     );
}
 
export default PetOwners;