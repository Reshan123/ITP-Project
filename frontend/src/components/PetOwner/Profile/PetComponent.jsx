const PetComponent = ({pet}) => {
    return ( 
        <div className="petCard">
            <div className="majorDetails">
                <div className="petName">{pet.petName}</div>
                <div className="petAge">Age : {pet.petAge}</div>
            </div>
            <div className="otherDetails">
                <div className="petGender">Gender : {pet.petGender}</div>
                <div className="petSpecies">Species : {pet.petSpecies}</div>
                <div className="petBreed">Breed : {pet.petBreed}</div>
            </div>

        </div>    
    );
}
 
export default PetComponent;



// {pet.petName}
// <br />
// {pet.petGender}
// <br />
// {pet.petAge}
// <br />
// {pet.petSpecies}
// <br />
// {pet.petBreed}
// <br /><br />