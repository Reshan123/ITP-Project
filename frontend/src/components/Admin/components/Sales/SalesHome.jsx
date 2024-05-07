import React from "react"
import {useEffect, useState} from "react"
import { useSalesContext } from "../../../../hooks/useSalesContext"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import './styles.css'

const SalesHome = () => {
    const [sales, setSales] = useState()

    const navigate = useNavigate();

    useEffect(() => {
      const fetchSales = async () => {
        const response = await fetch('http://localhost:4000/api/sales/')
        const json = await response.json()
  
        if (response.ok) {
          setSales(json)
        }
      }
  
      fetchSales()
    }, [])

    //To delete a sales record from the Database
    const deleteSale = async(id) => {
      const confirmDelete = confirm(`Are you sure you want to delete?`)
      if (confirmDelete) {
        const response = await fetch("http://localhost:4000/api/sales/" + id, {
          method: 'DELETE'
        })

          const json = await response.json()

          if(response.ok){
              dispatch({type:'DELETE_SALE', payload: json})
          }
      }
    }

    const handleUpdate = async(id) => {
      navigate(`/admin/home/SalesUpdate/${id}`)
    }
  


  return (
    <div className="saleDetails">
       <div className="saleHeader">
            <p>Sales Details</p>
                  {/* <div>
                      input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                      <button onClick={generatePDF}>Download Report</button>
              </div> */}
        </div>
        <hr/>
      <table className="saleTable">
      <thead>
          <tr>
          <th>Item Name</th>
          <th>Item Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Status</th>
          <th>Transaction</th>
          </tr>
      </thead>
      <tbody>
          {sales && sales.map(sale => (
          <tr key={sale._id}>
              <td>{sale.itemName}</td>
              <td>{sale.itemPrice}</td>
              <td>{sale.quantity}</td>
              <td>{sale.itemPrice * sale.quantity}</td>
              <td>{sale.status}</td>
              <td>{sale.createdAt}</td>
              <td>
              <center>
                            <button className='update-btn' onClick={() => handleUpdate(sale._id)}> Update </button>
                            <button className='dlt-btn' onClick={() => deleteSale(sale._id)}>Delete</button>
                        </center>

              </td>
          </tr>
          ))}
      </tbody>
      </table>
    </div>

  )
}

export default SalesHome
