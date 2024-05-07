import './styles.css';
import { useInventoryItemsContext } from '../../../../hooks/useInventoryItemsContext';
import { useSupplierContext } from '../../../../hooks/useSupplierContext';

const LandingPage = () => {
    const { inventoryitems, dispatch } = useInventoryItemsContext();
    const { suppliers, dispatch: supplierDispatch } = useSupplierContext();

    const adminLogOut = () => {
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/home';
    };

    function checkInventoryLevel(inventoryitem) {
        if (inventoryitem.currentStock <= 5) {
            const supplier = suppliers.find(Supplier => inventoryitem.supplierID === Supplier._id);
            if (supplier) {
                return (
                    <div className="inventoryManagement" key={inventoryitem._id}>
                        <div className="inventoryManagement-notifi">
                            <p style={{ color: 'red' }}>
                                The item {inventoryitem.itemName} needs restocking. Please contact the seller{' '}
                                {supplier.supplierName}.
                                <br />
                                <a href={`mailto:${supplier.supplierEmail} ` } target="_blank">
                                    <button>Contact The Seller</button>
                                </a>
                            </p>
                        </div>
                    </div>
                );
            }
        }
    }

    return (
        <div className="landingPage">
            <div className="landingPagesHeader">
                <p>Admin Dashboard</p>
                <button onClick={adminLogOut}>Log Out</button>
            </div>
            <hr />
            <h1>Notifications</h1>
            <br />
            <hr />
            <div className="inventoryManagement">
                <h2>Inventory Management System</h2>
                {inventoryitems && inventoryitems.map(inventoryitem => checkInventoryLevel(inventoryitem))}
            </div>
            <hr />
        </div>
    );
};

export default LandingPage;
