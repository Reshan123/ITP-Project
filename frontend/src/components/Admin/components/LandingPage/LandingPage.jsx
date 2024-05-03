import './styles.css'
import { useInventoryItemsContext } from "../../../../hooks/useInventoryItemsContext"

const LandingPage = () => {
    const { inventoryitems, dispatch } = useInventoryItemsContext();

    const adminLogOut = () => {
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/home'
    }

    // const contactSeller = () => {

    // }



    function checkInventoryLevel(inventoryitem) {
        if (inventoryitem.currentStock <= 5) {
            return (
                <div className="inventoryManagement">
                    <div className="inventoryManagement-notifi">
                        <p style={{ color: 'red' }}>The item {inventoryitem.itemName} needs restocking.
                            Please contact the seller SELLER NAME</p>
                        <a href="mailto:kavindyavishva@gmail.com"><button >Contact The Seller</button></a>
                    </div>
                </div>
            )
        }
    };




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
}

export default LandingPage;