import React from "react"
import {useEffect, useState} from "react"
import { useSalesContext } from "../../../../hooks/useSalesContext"
import jsPDF from "jspdf"
import './styles.css'

const SalesHome = () => {

// To get data from the Database    
    const {sales, dispatch} = useSalesContext()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentlyDisplayedSale, setCurrentlyDisplayedSale] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentlyDisplayedSale(sales)
      }, [sales])

    useEffect(() => {
        const fetchSales = async () =>  {   

            const response = await fetch ('http://localhost:4000/api/sales/')

            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_SALES', payload: json})
            }
        }

        fetchSales()
    }, [dispatch])
    
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

//To search 
useEffect(() => {
    if (sales) {
      const filteredList = sales.filter(sale => {
        const searchQueryLower = searchQuery.toLowerCase();
        return ((sale.itemName.toLowerCase().startsWith(searchQueryLower)))
      })
      setCurrentlyDisplayedSale(filteredList)
    }
  }, [searchQuery])

//To get a pdf of the sales
const generatePDF = () => {
    const doc = new jsPDF();
    const columns = [
      { header: 'Item Name', dataKey: 'itemName' },
      { header: 'Item Price', dataKey: 'itemPrice' },
      { header: 'Quantity', dataKey: 'quantity' },
      { header: 'Status', dataKey: 'status' },

    ];
    const filteredList = sales.filter(sale => {
      const searchQueryLower = searchQuery.toLowerCase();
      return ((sale.itemName.toLowerCase().startsWith(searchQueryLower)))
    });
    const rows = filteredList.map((sale) => ({
      itemName: sale.itemName,
      itemPrice: sale.itemPrice,
      quantity: sale.quantity,
      status: sale.status,

    }));
    // Add the table to the PDF
    doc.autoTable({
      columns,
      body: rows,
      startY: 20,

      styles: {
        // Styles applied to the table
        cellPadding: 2,
        fontSize: 10,
        valign: 'middle',
        halign: 'center',
        cellWidth: 'auto', // Auto column width
      },

      columnStyles: {
        // Custom styles for specific columns
        supplierName: { fontStyle: 'bold' },
      },

      headerStyles: {
        fillColor: [100, 100, 100], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontStyle: 'bold', // Bold font for header
      },

      bodyStyles: {
        textColor: [50, 50, 50], // Body text color
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245], // Alternate row background color
      },
    });
    
        // Save the PDF
        const filename = 'salesReport.pdf';
        doc.save(filename);
}    

return(
        <div className="saleDetails">
                  <div className="saleHeader">
                        <p>Sales Details</p>
                        <div>
                            <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            <button onClick={generatePDF}>Download Report</button>
                        </div>
                    </div>
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
                    {currentlyDisplayedSale && currentlyDisplayedSale.map(sale => (
                    <tr key={sale._id}>
                        <td>{sale.itemName}</td>
                        <td>{sale.itemPrice}</td>
                        <td>{sale.quantity}</td>
                        <td>{sale.itemPrice * sale.quantity}</td>
                        <td>{sale.status}</td>
                        <td>{sale.createdAt}</td>
                        <td>
                        <center>
                            <button className='update-btn' onClick={() => navigate(`/admin/home/SalesUpdate/${sale._id}`)}> Update </button>
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
}

export default SalesHome