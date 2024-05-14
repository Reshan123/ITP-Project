import { useSupplierContext } from "../../../../hooks/useSupplierContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './styles.css'
import jsPDF from "jspdf"

const SupplierDetails = ({ supplier }) => {

  const { suppliers, dispatch } = useSupplierContext()
  const [currentlyDisplayedSupplier, setCurrentlyDisplayedSupplier] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentlyDisplayedSupplier(suppliers)
  }, [suppliers])

  useEffect(() => {
    if (suppliers) {
      const filteredList = suppliers.filter(supplier => {
        const searchQueryLower = searchQuery.toLowerCase();
        return ((supplier.supplierName.toLowerCase().startsWith(searchQueryLower)))
      })
      setCurrentlyDisplayedSupplier(filteredList)
    }
  }, [searchQuery])

  const handleClick = async (id, supplierName) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${supplierName}"?`)
    if (confirmDelete) {
      const response = await fetch("http://localhost:4000/api/supplier/" + id, {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'DELETE_SUPPLIER', payload: json })
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const columns = [
      { header: 'Supplier Name', dataKey: 'supplierName' },
      { header: 'Supplier Contact', dataKey: 'supplierContact' },
      { header: 'Supplier Email', dataKey: 'supplierEmail' },
      { header: 'Supplier Company', dataKey: 'supplierCompany' },
      { header: 'Item name', dataKey: 'supplierItem' }


    ];
    const filteredList = suppliers.filter(supplier => {
      const searchQueryLower = searchQuery.toLowerCase();
      return ((supplier.supplierName.toLowerCase().startsWith(searchQueryLower)))
    });
    const rows = filteredList.map((supplier) => ({
      supplierName: supplier.supplierName,
      supplierContact: supplier.supplierContact,
      supplierEmail: supplier.supplierEmail,
      supplierCompany: supplier.supplierCompany,
      supplierItem: supplier.itemName

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
    const filename = 'supplierReport.pdf';
    doc.save(filename);

  };


  return (
    <div className="supplier-content">

      <div className="supplierHeader">
        <p>Supplier Details</p>
        <div>
          <input type="text" placeholder="Search Supplier" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className='add-btn' onClick={() => navigate(`/admin/home/SupplierForm/`)} >Add a new Supplier</button>
          <button onClick={generatePDF}>Download Report</button>
        </div>
      </div>
      <hr />
      {/* <div className="pagination">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
      </div> */}
      <div className="supplier-table">
      <table className="supplier-table-style">
          <thead>
            <tr>
              <th width="10%">Supplier Name</th>
              <th width="17%">Email</th>
              <th width="10%">Contact</th>
              <th width="10%">Company</th>
              <th width="9%">Items Name</th>
              <th width="20%">Operations</th>
            </tr>
          </thead>
          <tbody>
      
      

          {currentlyDisplayedSupplier && currentlyDisplayedSupplier.map(supplier => (
            <tr key={supplier._id}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.supplierContact}</td>
              <td>{supplier.supplierEmail}</td>
              <td>{supplier.supplierCompany}</td>
              <td>{supplier.itemName}</td>
              <td>
                <center>
                  <button className='supplier-update-btn' onClick={() => navigate(`/admin/home/supplierUpdate/${supplier._id}`)} >Update</button>
                  <button className='supplier-dlt-btn' onClick={() => handleClick(supplier._id, supplier.supplierName)}>Delete</button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>


  )
}

export default SupplierDetails