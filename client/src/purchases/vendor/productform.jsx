import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";




const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
  <div className="maincontainer">
    <div >
      <div className="title">
        <p>Add-Vendor</p>
      </div>

      <form onSubmit={saveProduct}>
        <div className="user_details">
          <div className="input_box">
            <label for="name">Product Image</label>
            <input type="file"  name="image" style={{color:"black" }}
              onChange={(e) => handleImageChange(e)} placeholder="Enter Product Image" required />
          </div>
          {imagePreview != null ? (
            <div style={{maxWidth:"200px"}} className="image-preview">
              <img src={imagePreview}   alt="product" />
            </div>
          ) : (
            <p>No image set for this poduct.</p>
          )}
          <div className="input_box">
            <label for="username">Full Name:</label>
            <input type="text"style={{color:"black" }} name="name" placeholder="Enter Vendor Name" required value={product?.name}
              onChange={handleInputChange} />
          </div>
          <div className="input_box">
            <label for="username">email:</label>
            <input type="text" style={{color:"black" }} name="email" placeholder="Enter Vendor Email" required value={product?.email}
               onChange={handleInputChange} />
          </div>

          <div className="input_box">
            <label for="phone">phone number :</label>
            <input type="number" style={{color:"black" }} name="phone" placeholder="Enter phone number" required value={product?.phone}
              onChange={handleInputChange} />
          </div>
          <div className="input_box">
            <label for="phone">address:</label>
            <input type="text" style={{color:"black" }} name="Address" placeholder="Enter Vendor address" required value={product?.Address}
            onChange={handleInputChange} />
          </div>
          <div className="input_box">
            <label for="phone">payment term:</label>
            <input type="text" style={{color:"black" }} name="paymentterm" placeholder="Enter Vendor payment term" required value={product?.paymentterm}
            onChange={handleInputChange} />
          </div>
          <div className="input_box">
            <label for="phone">Bank name:</label>
            <input type="text" style={{color:"black" }} name="bankname" placeholder="Enter Vendor Bank Name" required value={product?.bankname}
            onChange={handleInputChange} />
          </div>
          <div className="input_box">
            <label for="phone">Bank Account:</label>
            <input type="text" style={{color:"black" }} name="bankaccount" placeholder="Enter Vendor bankaccount" required value={product?.bankaccount}
            onChange={handleInputChange} />
          </div>
          
          
        </div>
        <div className="input_box">
          <label for="phone">Product Description:</label>
          <ReactQuill type="text" id="phone" placeholder="Enter Product Description" required theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
            style={{color:"black", margin:"10px" ,border: "2px solid black "}} />
        </div>
        <button type="submit" className="reg_btn">
        Save Product
        </button>
      </form>
    </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;