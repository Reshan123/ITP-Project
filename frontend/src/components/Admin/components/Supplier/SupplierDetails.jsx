import { useSupplierContext } from "../../../../hooks/useSupplierContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"

const SupplierDetails = ({supplier})=> {

    const {suppliers, dispatch} = useSupplierContext()
    const [currentlyDisplayedSupplier, setCurrentlyDisplayedSupplier] = useState({})

    useEffect(()=>{
        setCurrentlyDisplayedSupplier(suppliers)
    }, [suppliers])

    
    const handleClick = async (id, supplierName)=>{
        const confirmDelete = confirm(`Are you sure you want to delete "${supplierName}"?`)
        if(confirmDelete){
            const response = await  fetch('http://localhost:4000/api/supplier/' + supplier._id, {
                method:'DELETE'
        })
        const json = await response.json()

        if(response.ok)
            {
                dispatch({type: 'DELETE_SUPPLIER', payload: json})
            }
    }
};

    const generatePDF = () =>{
        const doc = new jsPDF();
        const columns = [
            { header: 'Supplier Name', dataKey: 'supplierName' },
            { header: 'Supplier Contact', dataKey: 'supplierContact' },
            { header: 'Supplier Email', dataKey: 'supplierEmail' },
            { header: 'Supplier Company', dataKey: 'supplierCompany' },

        ];
        const filteredList = suppliers.filter(supplier => {
            const searchQueryLower = searchQuery.toLowerCase();
            return ((inventoryitem.itemName.toLowerCase().startsWith(searchQueryLower)))
        });
        const rows = filteredList.map((supplier) => ({
            supplierName: supplier.supplierName,
            supplierContact: supplier.supplierContact,
            supplierEmail: supplier.supplierEmail,
            supplierCompany: supplier.supplierCompany,
            
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
  
  
  
      // Save the PDF with a unique name
      const filename = 'inventoryReport.pdf';
      doc.save(filename);
      
    };


    return(
        <div className="supplierDetails">

        <div className="supplierHeader">
          <p>Supplier Details</p>
          <div>
            <input type="text" placeholder="Search Text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button className='add-btn' onClick={() => navigate(`/admin/home/SupplierForm/`)} >Add a new Item</button>
            <button onClick={generatePDF}>Download Report</button>
          </div>
        </div>
  
        <table className="supplierTable">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Supplier Contact</th>
              <th>Supplier Email</th>
              <th>Supplier Company</th>
            </tr>
          </thead>
          <tbody>
            {currentlyDisplayedSupplier && currentlyDisplayedSupplier.map(supplier => (
              <tr key={supplier._id}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierContact}</td>
                <td>{supplier.itemStockCount}</td>
                <td>{supplier.currentStock}</td>
                <td>
                  <center>
                    <button className='update-btn' onClick={() => navigate(`/admin/home/supplierUpdate/${supplier._id}`)} >Update</button>
                    <button className='dlt-btn' onClick={() => handleClick(supplier._id, inventoryitem.supplierName)}>Delete</button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
  
  
  
  
      </div>
  
  
    )
  }

export default SupplierDetails