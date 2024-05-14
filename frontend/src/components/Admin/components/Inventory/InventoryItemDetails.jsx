import React from "react"
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext"
import { useSupplierContext } from "../../../../hooks/useSupplierContext"
import { useNavigate } from "react-router-dom"
import './styles.css'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useEffect, useState } from "react"

const InventoryItemDetails = () => {

  const { inventoryitems, dispatch } = useInventoryItemsContext()
  const { suppliers, dispatch: supplierDispatch } = useSupplierContext()
  const [currentlyDisplayedItem, setCurrentlyDisplayedItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();


  useEffect(() => {
    setCurrentlyDisplayedItems(inventoryitems)
  }, [inventoryitems])



  useEffect(() => {
    if (inventoryitems) {
      const filteredList = inventoryitems.filter(inventoryitem => {
        const searchQueryLower = searchQuery.toLowerCase();
        const supplier = suppliers.find(Supplier => inventoryitem.supplierID === Supplier._id);
        const itemNameLower = supplier ? supplier.itemName ? supplier.itemName.toLowerCase() : "" : ""
        const supplierNameLower = supplier ? supplier.supplierName.toLowerCase() : '';
        return (itemNameLower.startsWith(searchQueryLower) || supplierNameLower.startsWith(searchQueryLower));
      });
      setCurrentlyDisplayedItems(filteredList);
    }
  }, [searchQuery, inventoryitems, suppliers]);


  const handleClick = async (id) => {
    const confrimDelte = confirm("Are you sure you want to delete the item ?")
    if (confrimDelte) {
      const response = await fetch('http://localhost:4000/api/inventoryItems/' + id, {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'DELETE_ITEM', payload: json })

      }
    }
  };

  //Download Report Content
  const generatePDF = () => {
    const doc = new jsPDF();

    // Get the current date
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    doc.text(`Appointment Booking Report - ${currentDate}`, 14, 12);

    // Define the columns and rows for the table
    const columns = [
      { header: 'Supplier Name', dataKey: 'supplierName' },
      { header: 'Item Name', dataKey: 'itemName' },
      { header: 'Price', dataKey: 'itemPrice' },
      { header: 'Initial Stock Count', dataKey: 'itemStockCount' },
      { header: 'Current Stock Count', dataKey: 'currentStock' },
      { header: 'Item Description', dataKey: 'itemDescription' },
    ];

    const rows = currentlyDisplayedItem.map((inventoryitem) => ({
      supplierName: suppliers.find(Supplier => inventoryitem.supplierID === Supplier._id)?.supplierName || '',
      itemName: inventoryitem.itemName,
      itemPrice: inventoryitem.itemPrice,
      itemStockCount: inventoryitem.itemStockCount,
      currentStock: inventoryitem.currentStock,
      itemDescription: inventoryitem.itemDescription,
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
        itemName: { fontStyle: 'bold' },
        itemDescription: { overflow: 'linebreak' }, // Allow description to wrap
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



  return (


    <div className="inventoryiems">

      <div className="inventoryiemsHeader">
        <p>Inventory Items</p>
        <div>
          <input type="text" placeholder="Search Item or Supplier" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className='add-btn' onClick={() => navigate(`/admin/home/InventoryItemForm/`)} >Add a new Item</button>
          <button onClick={generatePDF}>Download Report</button>
        </div>
      </div>

      <hr />
      <table className="inventoryItemsTable">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Item Name</th>
            <th>Price <br />(in LKR)</th>
            <th>Initial Stock Count</th>
            <th>Current Stock Count</th>
            <th>Item Description</th>
            <th>Item image</th>
          </tr>
        </thead>
        <tbody>
          {currentlyDisplayedItem && currentlyDisplayedItem.map(inventoryitem => (
            <tr key={inventoryitem._id}>
              <td>{suppliers.map(Supplier => ((inventoryitem.supplierID == Supplier._id) && Supplier.supplierName))}</td>
              <td>{suppliers.map(Supplier => ((inventoryitem.supplierID == Supplier._id) && Supplier.itemName))}</td>
              <td>{inventoryitem.itemPrice}</td>
              <td>{inventoryitem.itemStockCount}</td>
              <td>{inventoryitem.currentStock}</td>
              <td>{inventoryitem.itemDescription}</td>
              <td>{<img src={inventoryitem.itemImageURL} alt="item" />}</td>
              <td>
                <center>
                  <button className='update-view-btn' onClick={() => navigate(`/admin/home/InventoryItemUpdate/${inventoryitem._id}`)} >Update</button>
                  <button className='dlt-btn' onClick={() => handleClick(inventoryitem._id)}>Delete</button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>





    </div>


  )
}

export default InventoryItemDetails