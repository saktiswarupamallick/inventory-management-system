import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases, updatePurchase, deletePurchase } from '../../redux/features/purchases/purchaseAction';
import { searchPurchases } from '../../redux/features/purchases/searchActions';
import { createCompany, updateCompany, getCompanyDetails } from '../../redux/features/company/companyActions';
import Modal from 'react-modal';
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
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.purchase.purchases);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [updatedname, setUpdatedname] = useState('');
  const [updatedDeliverto, setUpdatedDeliverto] = useState('');
  const [updateddiscount, setUpdateddiscount] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [InvoicemodalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState(0);
  const [editedProductQuantity, setEditedProductQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingpurchasedate, setUpdatingpurchasedate] = useState('');
  const [updatingexpectedshipmentdate, setUpdatingexpectedshipmentdate] = useState('');
  const [updatingPaymentterms, setUpdatingPaymentterms] = useState('');
  const [updatingdeliverymethod, setUpdatingdeliverymethod] = useState('');

  const handleSearch = () => {
    dispatch(searchPurchases(searchQuery));
  };

  const filteredOrders = orders.filter((order) => order.name.includes(searchQuery));

  const handleUpdate = (orderId) => {
    const orderToUpdate = orders.find((order) => order._id === orderId);
    setUpdatingOrderId(orderId);
    setUpdatedname(orderToUpdate.name);
    setUpdatedDeliverto(orderToUpdate.Deliverto);
    setUpdateddiscount(orderToUpdate.discount);
    setUpdatingpurchasedate(orderToUpdate.purchasedate);
    setUpdatingexpectedshipmentdate(orderToUpdate.expectedshipmentdate);
    setUpdatingPaymentterms(orderToUpdate.Paymentterms);
    setUpdatingdeliverymethod(orderToUpdate.deliverymethod);
  };


  const handleSaveUpdate = () => {
    const updatedOrder = {
      name: updatedname,
      Deliverto: updatedDeliverto,
      discount: updateddiscount,
      purchasedate: updatingpurchasedate,
      expectedshipmentdate: updatingexpectedshipmentdate,
      Paymentterms: updatingPaymentterms,
      deliverymethod: updatingdeliverymethod
    };

    dispatch(updatePurchase(updatingOrderId, updatedOrder));

    setUpdatingOrderId(null);
    setUpdatedname('');
    setUpdatedDeliverto('');
    setUpdateddiscount('');
    setUpdatingpurchasedate('');
    setUpdatingexpectedshipmentdate('');
    setUpdatingPaymentterms('');
    setUpdatingdeliverymethod('');
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  const handleCancelUpdate = () => {
    setUpdatingOrderId(null);
    setUpdatedname('');
    setUpdatedDeliverto('');
    setUpdateddiscount('');
    setUpdatingpurchasedate('');
    setUpdatingexpectedshipmentdate('');
    setUpdatingPaymentterms('');
    setUpdatingdeliverymethod('');
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deletePurchase(orderId));
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




  //companyform

  const companyDetails = useSelector(state => state.company.company);

  const [formData, setFormData] = useState({
    companyName: '',
    Deliverto: '',
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
        Deliverto: companyDetails.Deliverto,
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
      Deliverto: '',
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
                    <th style={{ width: "15%" }}>Deliverto</th>
                    <th>Order Date</th>
                    <th>Shipment Date</th>
                    <th>Payment Terms</th>

                    <th>Products Details</th>
                    <th>Total Amount</th>

                    <th>delivery Method</th>
                    <th style={{ width: "15%" }}>discount</th>
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
                            value={updatedname}
                            onChange={(e) => setUpdatedname(e.target.value)}
                          />
                        ) : (
                          order.name
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatedDeliverto}
                            onChange={(e) => setUpdatedDeliverto(e.target.value)}
                          />
                        ) : (
                          order.Deliverto
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingpurchasedate}
                            onChange={(e) => setUpdatingpurchasedate(e.target.value)}
                          />
                        ) : (
                          formatDate(order.purchasedate)
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingexpectedshipmentdate}
                            onChange={(e) => setUpdatingexpectedshipmentdate(e.target.value)}
                          />
                        ) : (
                          formatDate(order.expectedshipmentdate)
                        )}
                      </td>
                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updatingPaymentterms}
                            onChange={(e) => setUpdatingPaymentterms(e.target.value)}
                          />
                        ) : (
                          order.Paymentterms
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
                            value={updatingdeliverymethod}
                            onChange={(e) => setUpdatingdeliverymethod(e.target.value)}
                          />
                        ) : (
                          order.deliverymethod
                        )}
                      </td>

                      <td>
                        {updatingOrderId === order._id ? (
                          <input
                            type="text"
                            value={updateddiscount}
                            onChange={(e) => setUpdateddiscount(e.target.value)}
                          />
                        ) : (
                          order.discount
                        )}
                      </td>
                      <td>
                        {/* Add the "Invoice" button */}
                        <button onClick={() => openInvoiceModal(order._id)}>Bill</button>
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
                  <h1 style={{fontSize:"1.5rem",color:"black"}} >Your company details</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="companyName">Company Name</label>
                      <input style={{color:"black"}}
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="Deliverto">Deliverto</label>
                      <input style={{color:"black"}}
                        type="text"
                        id="Deliverto"
                        name="Deliverto"
                        value={formData.Deliverto}
                        onChange={handleChange}
                        placeholder="Enter Deliverto"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <input style={{color:"black"}}
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
                      <input style={{color:"black"}}
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
                      <input style={{color:"black"}}
                        type="text"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="Enter GSTIN"
                      />
                    </div>
                    <SubmitButton style={{marginTop:"16px",width:'100%',backgroundColor:"#d19fe8"}} type="submit">Submit</SubmitButton>
                  </form>
                </FormSection>
                {selectedOrder && (
                  <div style={{width:"950px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <SectionContainer style={{ display: "flex",flexDirection:"column" }}>
                      <div style={{ display: "flex" }}><InvoiceSection>
                        
                        <CompanyDetails style={{ flexDirection:"column", marginTop:"27px", padding:"15px"}}>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {formData.companyName}</p>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {formData.Deliverto}</p>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {formData.phone}</p>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {formData.email}</p>
                            <p style={{display:"flex", justifyContent:"flex-start"}}><strong style={{marginRight:"8px"}}>GSTIN:</strong> {formData.gstin}</p>
                          </CompanyDetails>
                      </InvoiceSection>
                        <InvoiceSection>
                          <h1 style={{fontSize:"3.5rem", fontWeight:"bold",marginLeft:"10px",display:"flex", justifyContent:"flex-end",color:"black"}}>Invoice</h1>
                        </InvoiceSection></div>
                      <div style={{display:"flex"}}>
                        <InvoiceSection style={{marginTop:"25px"}}>
                          <BillTo>
                            <SectionHeading style={{display:"flex", justifyContent:"flex-start",fontWeight:"bold"}}>Bill To</SectionHeading>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {selectedOrder.name}</p>
                            <p style={{display:"flex", justifyContent:"flex-start"}}> {selectedOrder.Deliverto}</p>
                          </BillTo>
                        </InvoiceSection>
                        <InvoiceSection style={{marginTop:"25px"}}>
                        
                          <p style={{display:"flex", justifyContent:"flex-end",color:"black"}}><strong style={{marginRight:"8px"}}>Due date:</strong> {formatDate(selectedOrder. expectedshipmentdate)}</p>
                          <p style={{display:"flex", justifyContent:"flex-end",color:"black"}}><strong style={{marginRight:"8px"}}>Terms:</strong> {selectedOrder.Paymentterms}</p>
                          
                        </InvoiceSection>
                      </div>


                    </SectionContainer>
                    <InvoiceSection larger>
                      <SectionHeading>Product Details</SectionHeading>
                      <ProductDetails>
                        <ProductTable>
                          <thead >
                            <tr style={{backgroundColor:"#d19fe8"}}>
                              <ProductTableHeader  style={{backgroundColor:"#d19fe8", color:"white"}}>Product Name</ProductTableHeader>
                              <ProductTableHeader  style={{backgroundColor:"#d19fe8", color:"white"}}>Price</ProductTableHeader>
                              <ProductTableHeader  style={{backgroundColor:"#d19fe8", color:"white"}}>Quantity</ProductTableHeader>
                              <ProductTableHeader  style={{backgroundColor:"#d19fe8", color:"white"}}>TaxRate(%)</ProductTableHeader>
                              <ProductTableHeader  style={{backgroundColor:"#d19fe8", color:"white"}}>SubTotal</ProductTableHeader>
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
                        <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px" ,display:"flex", justifyContent:"flex-end",backgroundColor:"#F1EDF2",padding:"10px"}}>Balance due: ${calculateTotalAmount(selectedOrder.products).toFixed(2)}</h4>
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
