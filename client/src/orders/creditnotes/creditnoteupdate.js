import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCreditnote } from '../../redux/features/creditnote/creditNoteActions';
import { getCustomers } from '../../redux/features/customers/customerActions';
import { getProducts } from '../../redux/features/product/productSlice';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

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

const InputGroup = styled.div`
  /* Your InputGroup styles here */
`;

const Label = styled.label`
  /* Your Label styles here */
`;

const Input = styled.input`
  /* Your Input styles here */
`;

const TextArea = styled.textarea`
  /* Your TextArea styles here */
`;

const SubmitButton = styled.button`
  /* Your SubmitButton styles here */
`;

const UpdateCreditnoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedCreditNote = useSelector((state) =>
    state.creditnote.creditnotes.find((note) => note._id === id)
  );

  const [clientName, setClientName] = useState(selectedCreditNote.clientName);
  const [creditNoteNo, setcreditNoteNo] = useState(selectedCreditNote.creditNoteNo);
  const [creditNoteDate, setcreditNoteDate] = useState(new Date(selectedCreditNote.creditNoteDate));
  const [discount, setDiscount] = useState(selectedCreditNote.discount);
  const [warehouseName, setWarehouseName] = useState(selectedCreditNote.warehouseName);
  const [status, setStatus] = useState(selectedCreditNote.status);
  const [Reference, setReference] = useState(selectedCreditNote.Reference);
  const [products, setProducts] = useState([

    ...selectedCreditNote.products // Existing products
  ]);
  const [selectedStatus, setSelectedStatus] = useState('');

  // Define the statusOptions array with your status options
  const statusOptions = ["open", "draft", "closed"];

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleProductNameSelect = (index, selectedOption) => {
    const updatedProducts = [...products];
    updatedProducts[index]['productName'] = selectedOption.value; // Use selected option's value
    setProducts(updatedProducts);
  };


   //for select client setup


   const customers = useSelector((state) => state.customer.customers);

   useEffect(() => {
       dispatch(getCustomers());
   }, [dispatch]);

   const handleClientSelect = (event) => {
       setClientName(event.target.value);
   };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, idx) => idx !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCreditnoteData = {
      clientName,
      creditNoteNo,
      creditNoteDate,
      discount,
      status,
      warehouseName,
      Reference,
      products
      // ... other updated data ...
    };
    dispatch(updateCreditnote(id, updatedCreditnoteData));
    navigate('/creditnotetable');
  };

  return (
    <FormContainer>
      <h2>Update Creditnote Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="InputGroup">
          <label className="Label">Client Name: </label>
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
          <label className="Label">Credit Note Number: </label>
          <input
            type="text"
            className="Input"
            value={creditNoteNo}
            onChange={(e) => setcreditNoteNo(e.target.value)}
            required
          />
        </div>

        <div className="InputGroup">
          <label className="Label">Credit Note Date: </label>
          <DatePicker
            selected={creditNoteDate}
            onChange={(date) => setcreditNoteDate(date)}
            dateFormat="MM/dd/yyyy"
            className="Input"
          />
        </div>

        <div className="InputGroup">
          <label className="Label">Discount: </label>
          <input
            type="number"
            className="Input"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>
        <div className="InputGroup">
          <label className="Label">status: </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

        <div className="InputGroup">
          <label className="Label">Warehouse Name: </label>
          <input
            className="Input"
            type="text"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            required
          />
        </div>

        <div className="InputGroup">
          <label className="Label">Reference: </label>
          <textarea
            className="TextArea"
            value={Reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>

        <div className="ProductsContainer">
          {products.map((product, index) => (
            <div className="ProductRow" key={index}>

              <div className="ProductRow" key={index}>
                <div className="InputGroup">
                  <label className="Label">Product Name: </label>
                  <input
                    type="text"
                    className="Input"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                    required
                  />
                </div>

                <div className="InputGroup">
                  <label className="Label">Price: </label>
                  <input
                    type="number"
                    className="Input"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                    required
                  />
                </div>

                <div className="InputGroup">
                  <label className="Label">Quantity: </label>
                  <input
                    type="number"
                    className="Input"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="InputGroup">
                  <label className="Label">Tax Rate: </label>
                  <input
                    className="Input"
                    type="number"
                    value={product.taxRate}
                    onChange={(e) => handleProductChange(index, 'taxRate', parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              <button type="button" onClick={() => handleRemoveProduct(index)}>Remove Product</button>
            </div>
          ))}
        </div>



        <SubmitButton type="submit" style={{ backgroundColor: "black" }}>Update</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default UpdateCreditnoteForm;
