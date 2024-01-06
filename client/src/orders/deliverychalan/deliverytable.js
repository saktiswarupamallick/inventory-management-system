import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliverychallans, updateDeliverychallan, deleteDeliverychallan, importDeliverychallans } from '../../redux/features/deliverychalan/deliveryActions';
import { searchOrders } from '../../redux/features/deliverychalan/searchActions';
import { createCompany, updateCompany, getCompanyDetails } from '../../redux/features/company/companyActions';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';

import styled from 'styled-components';
import "../../pages/admins/product.css"
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import { BiSearch } from "react-icons/bi";




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
        dispatch(importDeliverychallans(jsonData));
      };
      reader.readAsArrayBuffer(file);
    }
  };



  // export

  const exportToExcel = () => {
    const ordersData = orders.map((order) => ({
      'Client Name': order.clientName,
      'Deliverno': order.Deliverno,
      'Order Date': formatDate(order.deliverychallandate),
      'Shipment Date': formatDate(order.discount),
      'Payment Terms': order.challantype,

      // Add more fields as needed
    }));

    const ws = XLSX.utils.json_to_sheet(ordersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, 'orders.xlsx');
  };

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.deliverychallan.deliverychallans);

 


  useEffect(() => {
    dispatch(getDeliverychallans());
  }, [dispatch]);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [updatedClientName, setUpdatedClientName] = useState('');
  const [updatedDeliverno, setUpdatedDeliverno] = useState('');
  const [updatedReference, setUpdatedReference] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [InvoicemodalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState(0);
  const [editedProductQuantity, setEditedProductQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingdeliverychallandate, setUpdatingdeliverychallandate] = useState('');
  const [updatingdiscount, setUpdatingdiscount] = useState(0);
  const [updatingchallantype, setUpdatingchallantype] = useState('');
  const [updatingstatus, setUpdatingstatus] = useState('');

  const handleSearch = () => {
    dispatch(searchOrders(searchQuery));
  };

  const filteredOrders = orders.filter((order) => order.clientName && order.clientName.includes(searchQuery));


  const handleUpdate = (orderId) => {
    const orderToUpdate = orders.find((order) => order._id === orderId);
    setUpdatingOrderId(orderId);
    setUpdatedClientName(orderToUpdate.clientName);
    setUpdatedDeliverno(orderToUpdate.Deliverno);
    setUpdatedReference(orderToUpdate.Reference);
    setUpdatingdeliverychallandate(orderToUpdate.deliverychallandate);
    setUpdatingdiscount(orderToUpdate.discount);
    setUpdatingchallantype(orderToUpdate.challantype);
    setUpdatingstatus(orderToUpdate.status);
  };


  const handleSaveUpdate = () => {
    
    const updatedOrder = {
      clientName: updatedClientName,
      Deliverno: updatedDeliverno,
      Reference: updatedReference,
      deliverychallandate: updatingdeliverychallandate,
      discount: updatingdiscount,
      challantype: updatingchallantype,
      status: updatingstatus
    };
  
    dispatch(updateDeliverychallan(updatingOrderId, updatedOrder));

    setUpdatingOrderId(null);
    setUpdatedClientName('');
    setUpdatedDeliverno('');
    setUpdatedReference('');
    setUpdatingdeliverychallandate('');
    setUpdatingdiscount('');
    setUpdatingchallantype('');
    setUpdatingstatus('');
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  const handleCancelUpdate = () => {
    setUpdatingOrderId(null);
    setUpdatedClientName('');
    setUpdatedDeliverno('');
    setUpdatedReference('');
    setUpdatingdeliverychallandate('');
    setUpdatingdiscount('');
    setUpdatingchallantype('');
    setUpdatingstatus('');
   
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteDeliverychallan(orderId));
    }
  };

  const openInvoiceModal = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order);
    setInvoiceModalIsOpen(true); // Open the modal
  };

  const closeInvoiceModal = () => {
    setInvoiceModalIsOpen(false);
    setEditingProductId(null);
  };



  const openModal = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingProductId(null);
  };

  const handleEditProduct = (productId) => {
    const product = selectedOrder.products.find((p) => p._id === productId);
    setEditingProductId(productId);
    setEditedProductName(product.productName);
    setEditedProductPrice(product.price);
    setEditedProductQuantity(product.quantity);
    setTaxRate(product.taxRate);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = selectedOrder.products.map((product) => {
      if (product._id === editingProductId) {
        return {
          ...product,
          name: editedProductName,
          price: editedProductPrice,
          quantity: editedProductQuantity,
          taxRate: taxRate,
        };
      }
      return product;
    });

    setSelectedOrder({
      ...selectedOrder,
      products: updatedProducts,
    });
    setEditingProductId(null);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = selectedOrder.products.filter((product) => product._id !== productId);

    setSelectedOrder({
      ...selectedOrder,
      products: updatedProducts,
    });
  };

  const calculateTotalCost = (product) => {
    const subtotal = product.price * product.quantity;
    const taxAmount = (subtotal * product.taxRate) / 100;
    const totalCost = subtotal + taxAmount;
    return totalCost;
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + calculateTotalCost(product), 0);
  };

  const calculateFinalAmount = (products) => {
    const totalAmount = calculateTotalAmount(products);
    const discountAmount = (totalAmount * updatingdiscount) / 100;
    return totalAmount - discountAmount;
  };   

console.log(updatingdiscount)

  //companyform

  const companyDetails = useSelector(state => state.company.company);

  const [formData, setFormData] = useState({
    companyName: '',
    Deliverno: '',
    phone: '',
    email: '',
    gstin: '',
  });

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    if (companyDetails) {
      setFormData({
        companyName: companyDetails.companyName,
        Deliverno: companyDetails.Deliverno,
        phone: companyDetails.phone.toString(),
        email: companyDetails.email,
        gstin: companyDetails.gstin,
      });
    }
  }, [companyDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (companyDetails) {
      dispatch(updateCompany(formData));
    } else {
      dispatch(createCompany(formData));
    }

    setFormData({
      companyName: '',
      Deliverno: '',
      phone: '',
      email: '',
      gstin: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Maintable>
      <div >
        <button onClick={exportToExcel}>Export to Excel</button>
        <input placeholder='upload files' type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
        <Tablecontainer><FlexBetween style={{ display: "flex", justifyContent: "space-between", padding: "23px" }}><Header title={"Orders Table"} />
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
                    <th style={{ width: "15%" }}>Deliver No.</th>
                    <th>Challan Date</th>
                    <th>challan Type</th>
                    <th>Payment Terms</th>

                    <th>Products Details</th>
                    <th>Total Amount</th>

                    <th>delivery Method</th>
                    <th style={{ width: "15%" }}>Reference</th>
                    <th>Actions</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>

                  {filteredOrders.map((order) => (
                    
                    <tr key={order._id}>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatedClientName}
                            onChange={(e) => setUpdatedClientName(e.target.value)}
                          />
                          
                        ) : (
                          order.clientName
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatedDeliverno}
                            onChange={(e) => setUpdatedDeliverno(e.target.value)}
                          />
                        ) : (
                          order.Deliverno
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingdeliverychallandate}
                            onChange={(e) => setUpdatingdeliverychallandate(e.target.value)}
                          />
                        ) : (
                          formatDate(order.deliverychallandate)
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingchallantype}
                            onChange={(e) => setUpdatingchallantype(e.target.value)}
                          />
                        ) : (
                          order.challantype
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="number"
                            value={updatingdiscount}
                            onChange={(e) => setUpdatingdiscount(e.target.value)}
                          />
                        ) : (
                          order.discount
                        )}
                      </td>

                      <td>
                        <button onClick={() => openModal(order._id)}>Details</button>
                      </td>

                      <td>${calculateTotalAmount(order.products).toFixed(2)}</td>

                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingstatus}
                            onChange={(e) => setUpdatingstatus(e.target.value)}
                          />
                        ) : (
                          order.status
                        )}
                      </td>

                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatedReference}
                            onChange={(e) => setUpdatedReference(e.target.value)}
                          />
                        ) : (
                          order.Reference
                        )}
                      </td>
                      <td>
                        {/* Add the "Invoice" button */}
                        <button onClick={() => openInvoiceModal(order._id)}>Invoice</button>
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <div>
                            <button onClick={handleSaveUpdate}>Save</button>
                            <button onClick={handleCancelUpdate}>Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <button onClick={() => handleUpdate(order._id)}>Edit</button>
                            <button onClick={() => handleDelete(order._id)}>Delete</button>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal to display product details */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Product Details"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  padding: '20px',
                  width: '80%',
                  maxWidth: '800px',

                },
              }}


            >
              {selectedOrder && (
                <div>
                  <h3 style={{ color: "black" }}>Order Products Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ color: "black" }}>Product Name</th>
                        <th style={{ color: "black" }}>Price</th>
                        <th style={{ color: "black" }}>Quantity</th>
                        <th style={{ color: "black" }}>Tax Rate</th>
                        <th style={{ color: "black" }}>Subtotal</th>
                        <th style={{ color: "black" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            {editingProductId === product._id ? (
                              <input
                                type="text"
                                value={editedProductName}
                                onChange={(e) => setEditedProductName(e.target.value)}
                              />
                            ) : (
                              product.productName
                            )}
                          </td>
                          <td>
                            {editingProductId === product._id ? (
                              <input
                                type="number"
                                value={editedProductPrice}
                                onChange={(e) => setEditedProductPrice(e.target.value)}
                              />
                            ) : (
                              `$${product.price.toFixed(2)}`
                            )}
                          </td>
                          <td>
                            {editingProductId === product._id ? (
                              <input
                                type="number"
                                value={editedProductQuantity}
                                onChange={(e) => setEditedProductQuantity(e.target.value)}
                              />
                            ) : (
                              product.quantity
                            )}
                          </td>
                          <td>
                            {editingProductId === product._id ? (
                              <input
                                type="number"
                                value={product.taxRate} // Display tax rate as a percentage
                                onChange={(e) => setTaxRate(e.target.value)}
                              />
                            ) : (
                              `${(product.taxRate).toFixed(2)}%`
                            )}
                          </td>
                          <td>${calculateTotalCost(product).toFixed(2)}</td>
                          <td>
                            {editingProductId === product._id ? (
                              <div>
                                <button onClick={handleUpdateProduct}>Save</button>
                                <button onClick={() => setEditingProductId(null)}>Cancel</button>
                              </div>
                            ) : (
                              <div>
                                <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>


                  <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Total Amount: ${calculateTotalAmount(selectedOrder.products).toFixed(2)}</h4>
                  <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>
                    Discount: ${(calculateTotalAmount(selectedOrder.products) * updatingdiscount / 100).toFixed(2)}
                  </h4>
                  <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>
                    Final Amount: ${calculateFinalAmount(selectedOrder.products).toFixed(2)}
                  </h4>

                  <button onClick={closeModal}>Close</button>
                </div>
              )}
            </Modal>

            <CustomModal
              isOpen={InvoicemodalIsOpen}
              onRequestClose={closeInvoiceModal}
              contentLabel="Invoice"
            >

              <ModalContent>
                <FormSection>
                  <h1 style={{ fontSize: "1.5rem", color: "black" }} >Your company details</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="companyName">Company Name</label>
                      <input style={{ color: "black" }}
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="Deliverno">Deliverno</label>
                      <input style={{ color: "black" }}
                        type="text"
                        id="Deliverno"
                        name="Deliverno"
                        value={formData.Deliverno}
                        onChange={handleChange}
                        placeholder="Enter Deliverno"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <input style={{ color: "black" }}
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input style={{ color: "black" }}
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label htmlFor="gstin">GSTIN</label>
                      <input style={{ color: "black" }}
                        type="text"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="Enter GSTIN"
                      />
                    </div>
                    <SubmitButton style={{ marginTop: "16px", width: '100%', backgroundColor: "#d19fe8" }} type="submit">Submit</SubmitButton>
                  </form>
                </FormSection>
                {selectedOrder && (
                  <div style={{ width: "950px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <SectionContainer style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex" }}>
                        <InvoiceSection>

                          <CompanyDetails style={{ flexDirection: "column", marginTop: "27px", padding: "15px" }}>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.companyName}</p>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.Deliverno}</p>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.phone}</p>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.email}</p>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}><strong style={{ marginRight: "8px" }}>GSTIN:</strong> {formData.gstin}</p>
                          </CompanyDetails>
                        </InvoiceSection>
                        <InvoiceSection >
                          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", marginLeft: "10px", display: "flex", justifyContent: "flex-end", color: "black" }}>Delivery Challan</h1>
                          <p style={{ display: "flex", justifyContent: "flex-end" ,color:"black" }}>Delivery challan #{selectedOrder.Deliverno}</p>
                        </InvoiceSection>
                      </div>
                      <div style={{ display: "flex" }}>
                        <InvoiceSection style={{ marginTop: "25px" }}>
                          <BillTo>
                            <SectionHeading style={{ display: "flex", justifyContent: "flex-start", fontWeight: "bold" }}>Bill To</SectionHeading>
                            <p style={{ display: "flex", justifyContent: "flex-start" }}> {selectedOrder.clientName}</p>
                            
                          </BillTo>
                        </InvoiceSection>
                        <InvoiceSection style={{ marginTop: "25px" }}>

                          <p style={{ display: "flex", justifyContent: "flex-end", color: "black" }}><strong style={{ marginRight: "8px" }}>Challan date:</strong> {formatDate(selectedOrder.deliverychallandate)}</p>
                          <p style={{ display: "flex", justifyContent: "flex-end", color: "black" }}><strong style={{ marginRight: "8px" }}>Challan Type:</strong> {selectedOrder.challantype}</p>

                        </InvoiceSection>
                      </div>


                    </SectionContainer>
                    <InvoiceSection >
                      <SectionHeading>Product Details</SectionHeading>
                      <ProductDetails>
                        <ProductTable>
                          <thead >
                            <tr style={{ backgroundColor: "#d19fe8" }}>
                              <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Product Name</ProductTableHeader>
                              <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Price</ProductTableHeader>
                              <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Quantity</ProductTableHeader>
                              <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>TaxRate(%)</ProductTableHeader>
                              <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>SubTotal</ProductTableHeader>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.products.map((product) => (
                              <tr key={product._id}>
                                <td>
                                  {editingProductId === product._id ? (
                                    <input
                                      type="text"
                                      value={editedProductName}
                                      onChange={(e) => setEditedProductName(e.target.value)}
                                    />
                                  ) : (
                                    product.productName
                                  )}
                                </td>
                                <td>
                                  {editingProductId === product._id ? (
                                    <input
                                      type="number"
                                      value={editedProductPrice}
                                      onChange={(e) => setEditedProductPrice(e.target.value)}
                                    />
                                  ) : (
                                    `$${product.price.toFixed(2)}`
                                  )}
                                </td>
                                <td>
                                  {editingProductId === product._id ? (
                                    <input
                                      type="number"
                                      value={editedProductQuantity}
                                      onChange={(e) => setEditedProductQuantity(e.target.value)}
                                    />
                                  ) : (
                                    product.quantity
                                  )}
                                </td>
                                <td>
                                  {editingProductId === product._id ? (
                                    <input
                                      type="number"
                                      value={product.taxRate} // Display tax rate as a percentage
                                      onChange={(e) => setTaxRate(e.target.value)}
                                    />
                                  ) : (
                                    `${(product.taxRate).toFixed(2)}%`
                                  )}
                                </td>
                                <td>${calculateTotalCost(product).toFixed(2)}</td>

                              </tr>
                            ))}
                          </tbody>
                        </ProductTable>
                        <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px", display: "flex", justifyContent: "flex-end", backgroundColor: "#F1EDF2", padding: "10px" }}>Balance due: ${calculateTotalAmount(selectedOrder.products).toFixed(2)}</h4>
                      </ProductDetails>
                    </InvoiceSection>
                    <CloseButton onClick={closeInvoiceModal}>Close</CloseButton>
                  </div>
                )}

              </ModalContent>

            </CustomModal>
          </TableStyles>
        </Tablecontainer>
      </div>

    </Maintable>


  );
};

export default OrderTable;
