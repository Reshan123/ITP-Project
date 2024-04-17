import { useSupplierContext } from "../hooks/useSupplierContext"

const SupplierDetails = ({supplier})=> {

    const {dispatch} = useSupplierContext()

    
    const handleClick = async ()=>{
        const response = await  fetch('http://localhost:2000/api/supplier/' + supplier._id, {
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok)
            {
                dispatch({type: 'DELETE_SUPPLIER', payload: json})
            }
    }


    return(
        <div className="supplier-details">
            <h4>{supplier.supplierName}</h4>
            <p><strong>Supplier Name:</strong>{supplier.supplierName}</p>
            <p><strong>Supplier Contact:</strong>{supplier.supplierContact}</p>
            <p><strong>Supplier Email:</strong>{supplier.supplierEmail}</p>
            <p><strong>Supplier Company:</strong>{supplier.supplierCompany}</p>
            <p><strong>Supplier ID:</strong>{supplier.itemId}</p>
            <button
             onClick={handleClick}>delete</button>
        </div>
    )
}
export default SupplierDetails