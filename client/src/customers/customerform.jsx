import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addCustomer } from '../redux/features/customers/customerActions';
import styled from 'styled-components';




const StyledCustomerForm = styled.div`
  display: flex;
  justify-content: center;
 
 
  background-color: white;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  color: black;
  padding: 20px;
  width: 1500px;
`;

const FormTitle = styled.h2`
  text-align: start;
  font-weight:bold;
  font-size:2.7rem;
  color: black;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 7px;
    width: 50%;
    color: black;
  }

  button {
    background-color: #d19fe8;
    color: #fff;
    border: none;
   font-style: 0.5rem;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
  }
`;

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    
    customertype: '',
  });


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCustomer(formData));
    navigate("/customertable");
  };

  return (
    <StyledCustomerForm>
      <FormContainer>
        <FormTitle>Create Customer</FormTitle>
        <StyledForm onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px" }}><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" /></div>
          <div style={{ display: "flex", gap: "20px" }}><input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="address" /></div>

        <div style={{ display: "flex", gap: "20px" }}><input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" />
          <input type="text" name="customertype" value={formData.customertype} onChange={handleChange} placeholder="Customer Type" /></div>
        <button type="submit" style={{ display: "flex", justifyContent: "space-around" }}>Create</button>
      </StyledForm>
    </FormContainer>
    </StyledCustomerForm >
  );
};

export default CustomerForm;
