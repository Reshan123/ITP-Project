import { useEffect } from "react";
import { useAllPetOwnerContext } from "../../../../hooks/useAllPetOwnerContext";
import './styles.css'

const PetOwners = () => {

    const { petOwners, dispatch: petOwnerDispatch } = useAllPetOwnerContext()

    useEffect

    return ( 
        <div className="allPetOwnerPage">
            <div className="allPetOwnerHeader">
                <p>All Pet Owner Details</p>
            </div>
            <hr />
            <div className="allPetOwnerCardContainer">
                {petOwners && petOwners.map(petOwner => (
                    <div className="allPetOwnerCard">
                        <div className="petOwnerName">{petOwner.name}</div>
                        <div className="petOwnerEmail">{petOwner.email}</div>
                        <div className="buttonContainer">
                            <button>delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default PetOwners;