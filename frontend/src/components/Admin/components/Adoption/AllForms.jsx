import { useAdoptionContext } from "../../../../hooks/useAdoptionContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, ConfigProvider } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import './adoptionAdmin.css'

const AllForms = () => {


    const { adoptionForms, dispatch } = useAdoptionContext();
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('http://localhost:4000/api/adoption')
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

        const response = await fetch(`http://localhost:4000/api/adoption/${id}`, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_FORM', payload: json });
        }
    };

    const filteredForms = adoptionForms && Array.isArray(adoptionForms) ?
        adoptionForms.filter(form =>
            form.name.toLowerCase().includes(searchText.toLowerCase())
            || String(form.age).includes(searchText)
            || form.species.toLowerCase().includes(searchText.toLowerCase())
            || form.gender.toLowerCase() === searchText.toLowerCase()
            || String(form.approved).toLowerCase() === searchText.toLowerCase()
        ) : [];


    // Check if adoptionForms is an array
    if (!Array.isArray(adoptionForms)) {
        return <p>No adoption forms available.</p>;
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,

        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            sorter: (a, b) => a.species.localeCompare(b.species),
            sortOrder: sortedInfo.columnKey === 'species' && sortedInfo.order,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'Female' },
            ],
            filteredValue: filteredInfo.gender || null,
            onFilter: (value, record) => record.gender === value,
        },
        {
            title: 'Approval Status',
            dataIndex: 'approved',
            key: 'approved',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' }
            ],
            filteredValue: filteredInfo.approved || null,
            onFilter: (value, record) => record.approved === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button className="view-details-btn" onClick={() => handleViewDetails(record._id)}>View Details</Button>
                    <Button type="primary" className="listing-delete-btn" danger onClick={() => handleDelete(record._id)}>
                        <DeleteOutlined />
                    </Button>
                </>
            )
        }
    ];

    return (
        <div className="allforms-admin">
            <div className="allforms-header">
                <p>All Adoption Form Details</p>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearch}
                    className="search-input"
                />
                <button>Print</button>
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

export default AllForms