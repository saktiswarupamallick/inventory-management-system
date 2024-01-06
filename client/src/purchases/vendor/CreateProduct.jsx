import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./productform";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/vendors/vendorSlice";

const initialState = {
  
    name: "",
    email:"",phone:"",Address:"",paymentterm:"",bankname:"",bankaccount:""
  };

const CreateProduct = () => {

  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name,email,phone,Address,paymentterm,bankname,bankaccount } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    
    formData.append("email", email);
    formData.append("phone", Number(phone));
    formData.append("Address", Address);
    formData.append("paymentterm", paymentterm);
    formData.append("bankname", bankname);
    formData.append("bankaccount", bankaccount);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

   await dispatch(createProduct(formData));

    navigate("/vendorlist");
  };

  return (
    
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    
  )
}

export default CreateProduct