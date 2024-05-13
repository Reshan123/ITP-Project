import { useAdoptionContext } from "../../../../hooks/useAdoptionContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, ConfigProvider, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAdoptionRequestContext } from "../../../../hooks/useAdoptionRequestContext";

const AllRequestForms = () => {


    const { requestForms, dispatch } = useAdoptionRequestContext();
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalRecord, setModalRecord] = useState(null);

    const showModal = (record) => {
        setModalRecord(record);
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const navigate = useNavigate()

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('http://localhost:4000/api/adoptionRequest/getAll')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_FORMS', payload: json })
            }
        }
        fetchForms()
    }, [dispatch])

    const handleViewDetails = (id) => {
        navigate(`/admin/home/adoption-forms/view-form/${id}`);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
        setFilteredInfo(filters);
    };


    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this form?");

        if (!confirmed) {
            return;
        }

        const response = await fetch(`http://localhost:4000/api/adoptionRequest/${id}`, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_FORM', payload: json });
        }
    };

    const filteredForms = requestForms && Array.isArray(requestForms) ?
        requestForms.filter(form =>
            form.contactName.toLowerCase().includes(searchText.toLowerCase()) ||
            form.contactEmail.toLowerCase().includes(searchText.toLowerCase()) ||
            form.residenceType.toLowerCase().includes(searchText.toLowerCase()) ||
            form.petName.toLowerCase().includes(searchText.toLowerCase())

        ) : [];


    // Check if adoptionForms is an array
    if (!Array.isArray(requestForms)) {
        return <p>No Request forms available.</p>;
    }


    //Report generation
    const generatePDF = (data) => {
        // Create a new PDF instance
        const doc = new jsPDF();

        // Convert data to an array of arrays
        const tableData = data.map((form) => [
            form.petName,
            form.contactName,
            form.contactEmail,
            form.contactPhone,
            form.residenceType,
            form.status
        ]);

        // Add the table to the PDF
        doc.autoTable({
            head: [['Name', 'Email', 'Phone', 'Residence Type', 'Adoption Approval']],
            body: tableData,
            startY: 20,
            styles: {
                // Styles applied to the table
                cellPadding: 2,
                fontSize: 10,
                valign: 'middle',
                halign: 'center',
                cellWidth: 'wrap', // Auto column width
            },
            columnStyles: {
                // Custom styles for specific columns (if needed)
            },
            headStyles: {
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
        doc.save('adoption_request_report.pdf');
    };


    const columns = [
        {
            title: 'Pet Name',
            dataIndex: 'petName',
            key: 'petName',
            sorter: (a, b) => a.petName.localeCompare(b.petName),
            sortOrder: sortedInfo.columnKey === 'petName' && sortedInfo.order,
        },
        {
            title: 'Name',
            dataIndex: 'contactName',
            key: 'contactName',
            sorter: (a, b) => a.contactName.localeCompare(b.contactName),
            sortOrder: sortedInfo.columnKey === 'contactName' && sortedInfo.order,
        },
        {
            title: 'Email',
            dataIndex: 'contactEmail',
            key: 'contactEmail',
            sorter: (a, b) => a.contactEmail - b.contactEmail,
            sortOrder: sortedInfo.columnKey === 'contactEmail' && sortedInfo.order,

        },
        {
            title: 'Phone',
            dataIndex: 'contactPhone',
            key: 'contactPhone',
            sorter: (a, b) => a.contactPhone - b.contactPhone,
            sortOrder: sortedInfo.columnKey === 'contactPhone' && sortedInfo.order,

        },
        {
            title: 'Residence Type',
            dataIndex: 'residenceType',
            key: 'residenceType',
            sorter: (a, b) => a.residenceType.localeCompare(b.residenceType),
            sortOrder: sortedInfo.columnKey === 'residenceType' && sortedInfo.order,
        },
        {
            title: 'Adoption Approval',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' }
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button className="view-details-btn" onClick={() => showModal(record)}>View Details</Button>
                    <Button type="primary" className="listing-delete-btn" danger onClick={() => handleDelete(record._id)}>
                        <DeleteOutlined />
                    </Button>
                    <Modal
                        title="Form Details"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,

                        ]}
                    >

                        {modalRecord && (
                            <>
                                <p>Pet Name: {modalRecord.petName}</p>
                                <p>Name: {modalRecord.contactName}</p>
                                <p>Email: {modalRecord.contactEmail}</p>
                                <p>Phone: {modalRecord.contactPhone}</p>
                                <p>Residence Type: {modalRecord.residenceType}</p>
                                <p>Approval Status: {modalRecord.status}</p>
                                <p>Current Pets: {modalRecord.currentPets ? "Yes" : "No"}</p>
                                <p>Currunt Pet Details: {modalRecord.currentPetsDetails}</p>
                                <p>Reason For Adoption: {modalRecord.reasonForAdoption}</p>
                            </>
                        )}
                    </Modal>
                </>
            )
        }

    ];

    return (
        <div className="allforms-admin">
            <div className="allforms-header">
                <p>All Adoption Request Form Details</p>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearch}
                    className="search-input"
                />
                <button onClick={() => { console.log(filteredForms); generatePDF(filteredForms) }}>Print</button>
            </div>
            <hr></hr>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "#333",
                        }
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredForms}
                    onChange={handleChange}
                    pagination={{ pageSize: 5 }}
                    bordered
                    className="custom-table"
                    headerClassName="custom-table-header"

                />
            </ConfigProvider>
        </div>
    );
}
export default AllRequestForms