import React from "react"
import {useEffect, useState} from "react"
import { useSalesContext } from "../../../../hooks/useSalesContext"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import './styles.css'

const SalesHome = () => {
    const [sales, setSales] = useState()
   const { salesDispatch } = useSalesContext()
    const [currentlyDisplayedSale, setCurrentlyDisplayedSale] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
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

    useEffect(() =>  {
      setCurrentlyDisplayedSale(sales)
    },[sales])

    //To delete a sales record from the Database
    const deleteSale = async(id) => {
      const confirmDelete = confirm(`Are you sure you want to delete?`)
      if (confirmDelete) {
        const response = await fetch("http://localhost:4000/api/sales/" + id, {
          method: 'DELETE'
        })

          const json = await response.json()

          if(response.ok){
            //Update local state after successful deletion
            setSales(prevSales => prevSales.filter(sale => sale._id !== id));
            salesDispatch({type:'DELETE_SALE', payload: json})
          }else{
            console.error("Failed to delete sale");
          }
      }
    }

    const handleUpdate = async(id) => {
      navigate(`/admin/home/SalesUpdate/${id}`)
    }
  
    //Search a sale
    useEffect(() => {
      if (sales) {
        const filteredList = sales.filter(sale => {
          const searchQueryLower = searchQuery.toLowerCase();
          const saleDate = new Date(sale.createdAt).toLocaleDateString().toLowerCase();
          return (
            sale.itemName.toLowerCase().startsWith(searchQueryLower) ||
            saleDate.startsWith(searchQueryLower)

          );
        });
        setCurrentlyDisplayedSale(filteredList);
      }
    }, [searchQuery, sales]);

    //Generate reports
    const generatePDF = () => {
      const doc = new jsPDF();
      const columns = [
        { header: 'Item Name', dataKey: 'itemName' },
        { header: 'Item Price', dataKey: 'itemPrice' },
        { header: 'Quantity', dataKey: 'quantity'},
        { header: 'Total', dataKey: 'total' },
        { header: 'Status', dataKey: 'status' },
        { header: 'Sales Date', dataKey: 'createdAt' },
        { header: 'Updated Date', dataKey: 'updatedAt' }
      ];
      const filteredList = sales.filter(sale => {
        const searchQueryLower = searchQuery.toLowerCase();
        return ((sale.itemName.toLowerCase().startsWith(searchQueryLower)))
      });
      const rows = filteredList.map((sale) => ({
        itemName: sale.itemName,
        itemPrice: sale.itemPrice,
        quantity: sale.quantity,
        total: (sale.status === "Refund" ? -sale.itemPrice * sale.quantity : sale.itemPrice * sale.quantity),
        status: sale.status,
        createdAt: new Date(sale.createdAt).toLocaleString(),
        updatedAt: new Date(sale.updatedAt).toLocaleString()
  
      }));

      //Calculate Total Sum
      const totalSum = calculateTotalSum(filteredList);


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
          itemName: { fontStyle: 'bold' },
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

      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        body: [
          ['Total Sale:',totalSum],
        ],
        headStyles: { fontStyle: 'bold' },
        styles: { fontStyle: 'bold' },
        theme: 'grid',
      });
  
      // Save the PDF with a unique name
      const filename = 'salesReport.pdf';
      doc.save(filename);
  
    };

    //Total sum of the sales
    const calculateTotalSum = (sales) => {
      if (!sales || sales.length === 0) return 0;
  
      return sales.reduce((total, sale) => {
        return (
          total +
          (sale.status === "Refund"
            ? -sale.itemPrice * sale.quantity : sale.itemPrice * sale.quantity)
        );
      }, 0);
    };

  return (
    <div className="saleDetails">
       <div className="saleHeader">
            <p>Sales Details</p>
                  <div>
                     < input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                     <button onClick={generatePDF}>Download Report</button>
                  </div>
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
          <th>Sales Date</th>
          <th>Updated</th>
          </tr>
      </thead>
      <tbody>
          {currentlyDisplayedSale && currentlyDisplayedSale.map(sale => (
          <tr key={sale._id}>
              <td>{sale.itemName}</td>
              <td>{sale.itemPrice}</td>
              <td>{sale.quantity}</td>
              <td>{sale.status === "Refund" ? -sale.itemPrice * sale.quantity : sale.itemPrice * sale.quantity}</td>
              <td style={{ color: sale.status === "Sold" ? "green" : "red" }}>{sale.status}</td>
              <td>{new Date(sale.createdAt).toLocaleDateString()} at {new Date(sale.createdAt).toLocaleTimeString()}</td>
              <td>{new Date(sale.updatedAt).toLocaleDateString()} at {new Date(sale.updatedAt).toLocaleTimeString()}</td>
              <td>
              <center>
                            <button className='update-btn' onClick={() => handleUpdate(sale._id)}> Update </button>
                            <button className='dlt-btn' onClick={() => deleteSale(sale._id)}> Delete </button>
              </center>
              </td>
          </tr>
          ))}
      </tbody>
      <tfoot>
          <tr>
            <td>Sales:</td>
            <td colSpan="2"></td>
            <td>{calculateTotalSum(currentlyDisplayedSale)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default SalesHome
