import { useNavigate } from "react-router-dom";
import { usePetContext } from '../../../hooks/usePetContext';
import { useEffect } from "react";


const PetComponent = ({pet}) => {

    const navigate = useNavigate()
    const { pets, dispatch: petDispatch } = usePetContext()


    const deletePet = async (petId) => {

        const deleteApproval = confirm("Are you sure you want to delete profile?")
        if (deleteApproval) {
            try {
                const config = {
                    method: 'DELETE'
                }
                const response = await fetch("http://localhost:4000/api/pet/deletePetFromID/" + petId, config)
                const json = await response.json()
                if (!response.ok) {
                    throw Error(json.message)
                }

                petDispatch({type:"DELETE PET", payload: petId})
                
            } catch (error) {
                console.log(error.message)
            }
        }

    }


    useEffect(() => {
        document.querySelectorAll(".carousel").forEach((carousel) => {
            const items = carousel.querySelectorAll(".carousel__item");
            const buttonsHtml = Array.from(items, () => {
              return `<span class="carousel__button"></span>`;
            });
          
            carousel.insertAdjacentHTML(
              "beforeend",
              `
                  <div class="carousel__nav">
                      ${buttonsHtml.join("")}
                  </div>
              `
            );
          
            const buttons = carousel.querySelectorAll(".carousel__button");
          
            buttons.forEach((button, i) => {
              button.addEventListener("click", () => {
                // un-select all the items
                items.forEach((item) =>
                  item.classList.remove("carousel__item--selected")
                );
                buttons.forEach((button) =>
                  button.classList.remove("carousel__button--selected")
                );
          
                items[i].classList.add("carousel__item--selected");
                button.classList.add("carousel__button--selected");
              });
            });
          
            // Select the first item on page load
            items[0].classList.add("carousel__item--selected");
            buttons[0].classList.add("carousel__button--selected");
          });
    }, [pets])
      

    return ( 
        <div className="petCard">
            <div className="carousel">
                {pet.petImage.map((img, i) => (
                    <div key={i} className="carousel__item">
                        <img src={"http://localhost:4000/PetImages/"+ img} alt="img" />
                    </div>
                ))}
            </div>
            <div className="majorDetails">
                <div className="petName">{pet.petName}</div>
                <div className="petAge">Age : {pet.petAge}</div>
            </div>
            <div className="otherDetails">
                <div className="petGender">Gender : {pet.petGender}</div>
                <div className="petSpecies">Species : {pet.petSpecies}</div>
                <div className="petBreed">Breed : {pet.petBreed}</div>
            </div>
            <div className="buttonContainer">
                <button onClick={() => {navigate("/pet/profile/petUpdate/"+ pet._id)}}>Update</button>
                <button className="delete" onClick={() => deletePet(pet._id)}>Delete</button>
            </div>

        </div>    
    );
}
 
export default PetComponent;