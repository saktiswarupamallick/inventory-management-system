import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../redux/features/customers/customerActions';
import { getProducts } from '../../redux/features/product/productSlice';
import { addCreditnote } from '../../redux/features/creditnote/creditNoteActions';
import DatePicker from 'react-datepicker'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Select from 'react-select';


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

const CreditnoteForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clientName, setClientName] = useState('');
    const [creditNoteNo, setcreditNoteNo] = useState('');
    const [creditNoteDate, setcreditNoteDate] = useState('');
    const [discount, setdiscount] = useState('');
    const [warehouseName, setwarehouseName] = useState('');
    const [Reference, setReference] = useState('');
    const [status, setstatus] = useState('');
    const [products, setProducts] = useState([
        { productName: '', price: '', quantity: '', taxRate: '' },
    ]);

    const [statusOptions] = useState(["open", "draft", "closed"]);
    const [selectedStatus, setSelectedStatus] = useState('');


    //for select client setup


    const customers = useSelector((state) => state.customer.customers);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const handleClientSelect = (event) => {
        setClientName(event.target.value);
    };

    //for select product


    const productNames = useSelector((state) => state.product.products.map(product => product.name));

    useEffect(() => {
        dispatch(getCustomers());
        // Fetch product names when the component mounts
        dispatch(getProducts());
    }, [dispatch]);

    // Handle product name select change
    const handleProductNameChange = (index, value) => {
        const updatedProducts = [...products];
        updatedProducts[index]['productName'] = value;
        setProducts(updatedProducts);
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
        const creditnoteData = {
            clientName,
            creditNoteNo,
            Reference,
            products,
            creditNoteDate,
            discount,
            status: selectedStatus,
            warehouseName
        };
        dispatch(addCreditnote(creditnoteData));
        setClientName('');
        setcreditNoteNo('');
        setReference('');
        setcreditNoteDate('');
        setdiscount('');
        setstatus('');
        setwarehouseName('');
        setProducts([{ productName: '', price: '', quantity: '', taxRate: '' }]);
        navigate("/creditnotetable");
    };

    return (
        <FormContainer>
            <h2>Creditnote Form</h2>
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
                    <label className="Label">creditNoteNo:</label>
                    <input

                        value={creditNoteNo}
                        onChange={(e) => setcreditNoteNo(e.target.value)}
                        required
                        className="Input"
                    />
                </div>
                <div className="InputGroup">
                    <label className="Label">Creditnote Date:</label>
                    <DatePicker
                        selected={creditNoteDate}
                        onChange={(date) => setcreditNoteDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="Input"
                    />
                </div>

                <div className="InputGroup">
                    <label className="Label">discount:</label>
                    <input
                        value={discount}
                        onChange={(e) => setdiscount(e.target.value)}
                        required
                        className="Input"
                    />
                </div>

                <div className="InputGroup">
                    <label className="Label">warehouseName:</label>
                    <input
                        value={warehouseName}
                        onChange={(e) => setwarehouseName(e.target.value)}
                        required
                        className="Input"
                    />
                </div>
                <div className="InputGroup">
                    <label className="Label">Reference no:</label>
                    <textarea
                        value={Reference}
                        type="number"
                        onChange={(e) => setReference(e.target.value)}
                        required
                        className="TextArea"
                    />
                </div>
                <div className="InputGroup">
                    <label className="Label">status:</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        required
                        className="Input"
                    >
                        <option value="">Select a status</option>
                        {statusOptions.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ProductsContainer">
                    {products.map((product, index) => (
                        <div className="ProductRow" key={index}>
                            <div className="InputGroup">
                                <label className="Label">Product Name:</label>
                                <select
                                    value={product.productName}
                                    onChange={(e) => handleProductNameChange(index, e.target.value)}
                                    required
                                    className="Input"
                                >
                                    <option value="">Select a product</option>
                                    {productNames.map((productName, productNameIndex) => (
                                        <option key={productNameIndex} value={productName}>
                                            {productName}
                                        </option>
                                    ))}
                                </select>
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

export default CreditnoteForm;
