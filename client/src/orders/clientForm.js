import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getCustomers} from '../redux/features/customers/customerActions';
import { addOrder } from '../redux/features/ordersTable/orderActions';
import DatePicker from 'react-datepicker'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Select from 'react-select'; 
import ProductListModal from './ProductModal';


const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 30px;
  background-color: white;
  font-family: 'Poppins', sans-serif;
  border-radius: 10px;
  
  

  h2 {
    font-size: 32px;
    font-weight: bold;
    justify-content: flex-start;
    display:flex;
    margin-bottom: 20px;
    color: black;

  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .InputGroup {
    display: flex;
    flex-direction: column;
  }

  .Label {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
    color: black;
  }

  .Input,
  .TextArea {
    padding: 8px;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 8px;
    color: black;
  }

  .TextArea {
    resize: vertical;
  }

  .ProductsContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .ProductRow {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .ProductActions {
    display: flex;
    gap: 10px;
  }

  .AddProductButton,
  .SubmitButton {
    padding: 10px 20px;
    font-size: 20px;
    background-color: #d19fe8;
    color: white;
    border: 2px solid black;
    border-radius: 8px;
    cursor: pointer;
  }

  .RemoveProductButton {
    margin-top: 10px;
    padding: 12px 12px;
    border: 2px solid black;
    border-radius: 8px;
    font-size: 14px;
    background-color: red;
  }

  @media screen and (max-width: 768px) {
    form {
      grid-template-columns: 1fr;
    }

    .ProductRow {
      flex-direction: column;
    }
  }
`;
const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [orderdate, setorderdate] = useState('');
  const [expectedshipmentdate, setexpectedshipmentdate] = useState('');
  const [Paymentterms, setPaymentterms] = useState('');
  const [deliverymethod, setdeliverymethod] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([
    { productName: '', price: '', quantity: '', taxRate: '' },
  ]);


  //for select client setup

 
  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleClientSelect = (event) => {
    setClientName(event.target.value);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productName: '', price: '', quantity: '', taxRate: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      clientName,
      address,
      description,
      products,
      orderdate,
      expectedshipmentdate,
      Paymentterms,
      deliverymethod
    };
    dispatch(addOrder(orderData));
    setClientName('');
    setAddress('');
    setDescription('');
    setorderdate('');
    setexpectedshipmentdate('');
    setPaymentterms('');
    setdeliverymethod('');
    setProducts([{ productName: '', price: '', quantity: '', taxRate: '' }]);
    navigate("/clienttable");
  };

  return (
    <FormContainer>
      <h2>Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="InputGroup">
          <label className="Label">Client Name:</label>
          <select
            value={clientName}
            onChange={handleClientSelect}
            className="Input"
            required
          >
            <option value="">Select a client</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        
      
        <div className="InputGroup">
          <label className="Label">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="Input"
          />
        </div>
        <div className="InputGroup">
          <label className="Label">Order Date:</label>
          <DatePicker
            selected={orderdate}
            onChange={(date) => setorderdate(date)}
            dateFormat="MM/dd/yyyy"
            className="Input"
          />
        </div>
        <div className="InputGroup">
          <label className="Label">Shipment Date:</label>
          <DatePicker
            selected={expectedshipmentdate}
            onChange={(date) => setexpectedshipmentdate(date)}
            dateFormat="MM/dd/yyyy"
            className="Input"
          />
        </div>

        <div className="InputGroup">
          <label className="Label">Payment terms:</label>
          <input
            value={Paymentterms}
            onChange={(e) => setPaymentterms(e.target.value)}
            required
            className="Input"
          />
        </div>
        <div className="InputGroup">
          <label className="Label">Delivery method:</label>
          <input
            value={deliverymethod}
            onChange={(e) => setdeliverymethod(e.target.value)}
            required
            className="Input"
          />
        </div>
        <div className="InputGroup">
          <label className="Label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="TextArea"
          />
        </div>
        <div className="ProductsContainer">
          {products.map((product, index) => (
            <div className="ProductRow" key={index}>
              <div className="InputGroup">
                <label className="Label">Product Name:</label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                  required
                  className="Input"
                />
              </div>
              <div className="InputGroup">
                <label className="Label">Price:</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                  required
                  className="Input"
                />
              </div>
              <div className="InputGroup">
                <label className="Label">Quantity:</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  required
                  className="Input"
                />
              </div>
              <div className="InputGroup">
                <label className="Label">Tax Rate:</label>
                <input
                  type="number"
                  value={product.taxRate}
                  onChange={(e) => handleProductChange(index, 'taxRate', e.target.value)}
                  required
                  className="Input"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="RemoveProductButton"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddProduct} className="AddProductButton">
          Add Product
        </button>
        <button type="submit" className="SubmitButton">
          Submit
        </button>
      </form>

    </FormContainer>
  );
};

export default OrderForm;
