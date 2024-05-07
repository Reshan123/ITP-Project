import { useEffect, useState } from "react"
import { useAdoptionContext } from "../../../hooks/useAdoptionContext"
import { useUserContext } from '../../../hooks/userContextHook';
import { useNavigate } from "react-router-dom"
import image1 from './images/image1.png'
import './styles.css'
import { Pagination } from 'antd';
import search_img from './images/search.png'

const AdoptPet = ({ navBarProps }) => {
    const navigate = useNavigate();

    navBarProps("#FFF", "#E2929D", "#E2929D")

    const { adoptionForms, dispatch } = useAdoptionContext();
    const { user, dispatch: userDispatch } = useUserContext()
    const [searchQuery, setSearchQuery] = useState('')


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;


    const totalAdoptionForms = 100;


    const handlePageChange = (page) => {
        setCurrentPage(page);

    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query
    };

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('http://localhost:4000/api/adoption')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_FORMS', payload: json })
            }
        }
        fetchForms()
    }, [dispatch])

    const handleNewAdoptionClick = () => {

        if (!user) {
            navigate('/pet/signin')
        }

        else { navigate('/pet/adopt/adoptionForm'); }

    };

    const handleViewDetails = (id) => {
        navigate(('/pet/adopt/form-details/' + id))
    }

    function getDaysSinceCreation(createdAt) {
        const creationDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - creationDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDays === 0) {
            // Calculate the difference in hours
            const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
            return differenceInHours + " hours";
        } else {
            return differenceInDays + " days";
        }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;


    const filteredAdoptionForms = Array.isArray(adoptionForms)
        ? adoptionForms.filter(adoptionForm =>
            adoptionForm.approved === 'Approved' &&
            (adoptionForm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                adoptionForm.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                adoptionForm.gender.toLowerCase() === searchQuery.toLowerCase())
        )
        : [];


    return (
        <div className="AdoptionFormPage">

            <div className="landing-image">
                <img src={image1} alt="" />
                <div className="image-text-1">Don’t Buy, Adopt!</div>
                <div className="image-text-2">Find your purr-fect match at
                    Pawpulz Adoption Center! Our cuddly companions are
                    waiting to steal your heart and fill your home with endless love and joy.</div>
            </div>
            <div className="listing-welcome-text">Meet the good-est Girls and Boys
                waiting for their forever homes</div>


            <div className="section-1">
                <div className="search-box">
                    <button class="btn-search">
                        <img src={search_img} alt="Search Icon" className="search-icon" />
                        <i className="fas fa-search"></i>
                    </button>
                    <input
                        type="text"
                        className="input-search"
                        placeholder="Type to Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="listings">
                    {filteredAdoptionForms.length > 0 ? (
                        filteredAdoptionForms
                            .slice(startIndex, endIndex) // Pagination logic
                            .map((adoptionForm, index) => (
                                <article key={index} className="card">
                                    <div className="card_header">
                                        <img
                                            className="card__background"
                                            src={adoptionForm.imageUrl || ''}
                                            alt="Pet"
                                            width="1920"
                                            height="2193"
                                        />
                                    </div>
                                    <div className="card__content">
                                        <h2 className="card__title">{adoptionForm.name}</h2>
                                        <div className="card__content--container">
                                            <h2 className="card__content_title">About {adoptionForm.name}</h2>
                                            <p className="card__description">
                                                <strong>Gender: </strong>{adoptionForm.gender}<br />
                                                <strong>Breed: </strong>{adoptionForm.breed}
                                            </p>
                                        </div>
                                        <div className="card_footer">
                                            <p>{getDaysSinceCreation(adoptionForm.createdAt)} ago</p>
                                            <button className="card__button" onClick={() => handleViewDetails(adoptionForm._id)}>View Details</button>
                                        </div>
                                    </div>
                                </article>
                            ))
                    ) : (
                        <p>No adoption forms available.</p>
                    )}
                </div>
                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        total={totalAdoptionForms}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </div>
            </div>


            <div className="add-newFrom">
                <div className="New-Form-Text-container">
                    <p >Give your beloved pet the chance to find a loving forever home</p>
                    <p>Your pet's story matters, and together, we can help them embark on a new journey filled with love and care.</p>
                </div>
                <button className="adoptPetButton" onClick={handleNewAdoptionClick}>Find A New Home for Your Pet</button>
            </div>
        </div>

    );
}

export default AdoptPet;