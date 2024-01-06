import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, updateCustomer, deleteCustomer, importCustomers } from '../redux/features/customers/customerActions';
import { searchcustomers } from '../redux/features/customers/searchActions';
import { createCompany, updateCompany, getCompanyDetails } from '../redux/features/company/companyActions';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import "../pages/admins/product.css"
import Header from "../components/Header";
import FlexBetween from "../components/FlexBetween";
import { BiSearch } from "react-icons/bi";
import axios from 'axios';


const Maintable = styled.div`
font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;


`
const ProductTableHeader = styled.th`
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border: 1px solid #ccc;
`;

const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 80%;
  max-width: 1500px; /* Adjust the maximum width as needed */
  height: auto;
  background-color: white;
  border-radius: 8px;
  border: 2px solid black;
  padding: 20px;
  box-shadow: 4px 4px black;
  z-index: 1000;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;


const ModalContent = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  label {
    color: black;
    font-weight: bold;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 2px solid black;
    border-radius: 7px;
  }
`;
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InvoiceSection = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-right: ${props => (props.larger ? '20px' : '0')};
`;

const SectionHeading = styled.h2`
  font-size: 1.2rem;
  color: black;
  margin-bottom: 10px;
`;

const CompanyDetails = styled.div`
  color: black;
  width:350px;
  p {
    margin: 5px 0;
  }
`;

const BillTo = styled.div`
  color: black;
  width:350px;
  p {
    margin: 5px 0;
  }
`;

const ProductDetails = styled.div`
  margin-top: 20px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    
    padding: 8px;
  }
  th {
    background-color: #36454F;
  }
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const Tablecontainer = styled.div`
width: 100%;
overflow-x: auto;
max-width: 100%;
`

const TableStyles = styled.div`


  table {
    margin: 30px auto;
    font-family: "Poppins",sans-serif;
    width: 100%; 
    
    font-size: 16px;
    border: 2px solid black;
    border-radius: 6px;

  }

  tr
   {
    border: 2px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: white;
    color: black;
  }

 

  tr:hover {
    background-color: black;
  }

  @media screen and (max-width: 768px) {
    table {
      font-size: 14px;
      border:2px solid black;
      border-radius:6px;
    }

    th,
    td {
      padding: 6px;
      white-space: nowrap;
    }

    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5) {
      display: none;
    }

    th:last-child,
    td:last-child {
      padding: 6px;
    }
  }
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    
  }

  .search-button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .search-input {
      font-size: 14px;
    }

    .search-button {
      font-size: 14px;
    }

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: black;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 20px;
      width: 80%;
      max-width: 800px;
      overflow: hidden;
  
      @media screen and (max-width: 768px) {
        width: 90%;
      }
      .overlay {
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    
      .modal h3 {
        font-size: 24px;
        margin-bottom: 20px;
      }
    
      .modal table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
    
      .modal th,
      .modal td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
    
      .modal th {
        background-color: #f5f5f5;
        font-weight: bold;
      }
    
      .modal tr:hover {
        background-color: #f5f5f5;
      }
    
      .modal button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
      }
    
      .modal input[type="text"],
      .modal input[type="number"] {
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    
    }
    
  }
`;




const OrderTable = () => {

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);

  // import
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Dispatch the action to update the Redux store with imported data
        dispatch(importCustomers(jsonData));
      };
      reader.readAsArrayBuffer(file);
    }
  };



  // export

  const exportToExcel = () => {
    const ordersData = customers.map((customer) => ({
      'Client Name': customer.name,
      'Address': customer.address,
      'customer Date': formatDate(customer.creationdate),
      'Shipment Date': formatDate(customer.customertype),
      'Payment Terms': customer.phone,

      // Add more fields as needed
    }));

    const ws = XLSX.utils.json_to_sheet(ordersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'customers');
    XLSX.writeFile(wb, 'customers.xlsx');
  };



  useEffect(() => {
    console.log('Fetching customers...');
    dispatch(getCustomers());
  }, [dispatch]);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [updatedname, setUpdatedname] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingcreationdate, setUpdatingcreationdate] = useState('');
  const [updatingcustomertype, setUpdatingcustomertype] = useState('');
  const [updatingphone, setUpdatingphone] = useState('');
  const [updatingemail, setUpdatingemail] = useState('');

  const handleSearch = () => {
    dispatch(searchcustomers(searchQuery));
  };


  const filteredOrders = customers.filter((customer) => customer.name && customer.name.includes(searchQuery));
  console.log("Filtered customers:", filteredOrders);

  const handleUpdate = (customerId) => {
    const orderToUpdate = customers.find((customer) => customer._id === customerId);
    setUpdatingOrderId(customerId);
    setUpdatedname(orderToUpdate.name);
    setUpdatedAddress(orderToUpdate.address);
    setUpdatedDescription(orderToUpdate.description);
    setUpdatingcreationdate(orderToUpdate.creationdate);
    setUpdatingcustomertype(orderToUpdate.customertype);
    setUpdatingphone(orderToUpdate.phone);
    setUpdatingemail(orderToUpdate.email);
  };


  const handleSaveUpdate = () => {
    const updatedOrder = {
      name: updatedname,
      address: updatedAddress,
      description: updatedDescription,
      creationdate: updatingcreationdate,
      customertype: updatingcustomertype,
      phone: updatingphone,
      email: updatingemail
    };

    dispatch(updateCustomer(updatingOrderId, updatedOrder));

    setUpdatingOrderId(null);
    setUpdatedname('');
    setUpdatedAddress('');
    setUpdatedDescription('');
    setUpdatingcreationdate('');
    setUpdatingcustomertype('');
    setUpdatingphone('');
    setUpdatingemail('');
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  const handleCancelUpdate = () => {
    setUpdatingOrderId(null);
    setUpdatedname('');
    setUpdatedAddress('');
    setUpdatedDescription('');
    setUpdatingcreationdate('');
    setUpdatingcustomertype('');
    setUpdatingphone('');
    setUpdatingemail('');
  };

  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(customerId));
    }
  };

  //email-configuration

  const handleSendEmail = async (email) => {
    const emailContent = {
      to: email,
      subject: 'Subject of the email',
      text: 'Content of the email',
    };

    try {
      await axios.post('http://localhost:9000/send-email', emailContent);
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email');
    }
  };






  return (
    <Maintable>
      <div >
        <button onClick={exportToExcel}>Export to Excel</button>
        <input placeholder='upload files' type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
        <Tablecontainer><FlexBetween style={{ display: "flex", justifyContent: "space-between", padding: "23px" }}><Header title={"customers Table"} />
          <div>

            <div style={{ display: "flex", border: "3px solid black", padding: "5px", borderRadius: "10px", backgroundColor: "white", color: "black" }} >
              <BiSearch size={18} style={{ margin: "9px", color: "black" }} />
              <input style={{ color: "black", border: "none", padding: "10px" }}
                type="text"
                placeholder="Search by Client Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                onClick={handleSearch}
              />
            </div>
          </div>
        </FlexBetween>
          <TableStyles>
            <div>
              <table style={{ backgroundColor: "white", border: "3px solid black", borderRadius: "6px" }}>
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Client Name</th>
                    <th style={{ width: "15%" }}>Address</th>
                    <th>creation Date</th>
                    <th>type</th>
                    <th>phone</th>

                    <th>email</th>


                    <th>description</th>

                    <th>Actions</th>

                  </tr>
                </thead>
                <tbody>

                  {filteredOrders.map((customer) => (
                    <tr key={customer._id}>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatedname}
                            onChange={(e) => setUpdatedname(e.target.value)}
                          />
                        ) : (
                          customer.name
                        )}
                      </td>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatedAddress}
                            onChange={(e) => setUpdatedAddress(e.target.value)}
                          />
                        ) : (
                          customer.address
                        )}
                      </td>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatingcreationdate}
                            onChange={(e) => setUpdatingcreationdate(e.target.value)}
                          />
                        ) : (
                          formatDate(customer.creationdate)
                        )}
                      </td>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatingcustomertype}
                            onChange={(e) => setUpdatingcustomertype(e.target.value)}
                          />
                        ) : (
                          formatDate(customer.customertype)
                        )}
                      </td>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatingphone}
                            onChange={(e) => setUpdatingphone(e.target.value)}
                          />
                        ) : (
                          customer.phone
                        )}
                      </td>


                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatingemail}
                            onChange={(e) => setUpdatingemail(e.target.value)}
                          />
                        ) : (
                          customer.email
                        )}
                      </td>

                      <td>
                        {updatingOrderId === customer._id ? (
                          <input
                            type="text"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                          />
                        ) : (
                          customer.description
                        )}
                      </td>
                      <td>
                        {/* Email button */}
                        <button onClick={() => handleSendEmail(customer.email)}>Send Email</button>
                      </td>
                      <td>
                        {updatingOrderId === customer._id ? (
                          <div>
                            <button onClick={handleSaveUpdate}>Save</button>
                            <button onClick={handleCancelUpdate}>Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <button onClick={() => handleUpdate(customer._id)}>Edit</button>
                            <button onClick={() => handleDelete(customer._id)}>Delete</button>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>




          </TableStyles>
        </Tablecontainer>
      </div>

    </Maintable>


  );
};

export default OrderTable;
