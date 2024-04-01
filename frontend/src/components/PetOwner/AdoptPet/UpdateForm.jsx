import { useParams } from "react-router-dom"
import AdoptionFormDetails from "./AdoptionFormDetails"
import { useEffect, useState } from "react";

const UpdateForm = () => {
    const params = useParams()
    const id = params.id;
    const [adoptionForm, setAdoptionForm] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/api/adoption/' + id)
        const json = await response.json()
        setAdoptionForm(json)
    }

    if (!adoptionForm) {
        return <p>Loading</p>
    }

    return (adoptionForm &&
        <AdoptionFormDetails adoptionForm={adoptionForm} />
    )
}

export default UpdateForm