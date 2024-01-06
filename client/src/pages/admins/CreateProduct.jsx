import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./productform";
import {
  createProduct,
  selectIsLoading,
  selectCategory
} from "../../redux/features/product/productSlice";

const initialState = {
  type: "" ,unit: "" ,manufacturer: "" , upc: "" , mpn: ""  , ean: ""  ,isbn: "" , sp: "" , cp: ""  ,weight: "" ,vendor: "" ,brand: "" ,
    name: "",
    category: "",
    quantity: "",
   
  };

const CreateProduct = () => {

  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);
  const categories = useSelector(selectCategory);

  const { name, category,  quantity ,type,unit,manufacturer, upc, mpn , ean ,isbn, sp, cp ,weight,vendor,brand} = product;

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
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));

    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("type", type);
    formData.append("unit", unit);
    formData.append("manufacturer", manufacturer);
    formData.append("upc", upc);
    formData.append("mpn", mpn);
    formData.append("ean", ean);
    formData.append("isbn", isbn);
    formData.append("sp", sp);
    formData.append("cp", cp);
    formData.append("vendor", vendor);
    formData.append("weight", weight);
    formData.append("brand", brand);


    console.log(...formData);

   await dispatch(createProduct(formData));

    navigate("/productlist");
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
        categories={categories}
      />
    
  )
}

export default CreateProduct