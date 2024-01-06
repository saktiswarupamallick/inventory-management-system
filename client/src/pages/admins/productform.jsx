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
  categories, 
}) => {

  const {
    category,
    // ... (other product properties)
  } = product;
  


  return (
    <div className="maincontainer">
      <div>
        <form onSubmit={saveProduct}>
          <div className="user_details">
            <div className="input_box">
              <label for="name">Product Image</label>
              <input type="file" name="image" style={{ color: "black" }}
                onChange={(e) => handleImageChange(e)} placeholder="Enter Product Image" required />
            </div>
            {imagePreview != null ? (
              <div style={{ maxWidth: "200px" }} className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p style={{ color: "black" }}
               >No image set for this poduct.</p>
            )}

            <div className="input_box" style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
              <label>Product Type:</label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="radio"
                    id="goods"
                    name="type"
                    value="goods"
                    checked={product?.type === "goods"}
                    onChange={handleInputChange}
                    style={{ width: "19px", marginRight: "5px" }}
                  />
                  Goods
                </label>
                <label>
                  <input
                    type="radio"
                    id="service"
                    name="type"
                    value="service"
                    checked={product?.type === "service"}
                    onChange={handleInputChange}
                    style={{ width: "19px", marginRight: "5px" }}
                  />
                  Service
                </label>
              </div>
            </div>


            <div className="input_box">
              <label for="username" title="product name">Product Name:</label>
              <input type="text" style={{ color: "black" }} name="name" placeholder="Enter Product Name" required value={product?.name}
                onChange={handleInputChange} />
            </div>
            <div className="input_box">
              <label for="username">Product Category:</label>
              <input type="text" style={{ color: "black" }} name="category" placeholder="Enter Product Category" required value={product?.category}
                onChange={handleInputChange} />
            </div>
          
          
            <div className="input_box">
              <label for="phone">Product Quantity:</label>
              <input type="number" style={{ color: "black" }} name="quantity" placeholder="Enter Product Quantity" required value={product?.quantity}
                onChange={handleInputChange} />
            </div>
            <div className="input_box">
              <label htmlFor="unit">Product Unit:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="unit"
                placeholder="Enter Product Unit"
                required
                value={product?.unit}
                onChange={handleInputChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="manufacturer"
                placeholder="Enter Manufacturer"
                required
                value={product?.manufacturer}
                onChange={handleInputChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="upc">UPC:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="upc"
                placeholder="Enter UPC"
                required
                value={product?.upc}
                onChange={handleInputChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="mpn">MPN (Manufacturer Part Number):</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="mpn"
                placeholder="Enter MPN"
                required
                value={product?.mpn}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="ean">EAN (European Article Number):</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="ean"
                placeholder="Enter EAN"
                required
                value={product?.ean}
                onChange={handleInputChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="isbn">ISBN (International Standard Book Number):</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="isbn"
                placeholder="Enter ISBN"
                required
                value={product?.isbn}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="sp">Selling Price:</label>
              <input
                type="number"
                style={{ color: "black" }}
                name="sp"
                placeholder="Enter Selling Price"
                required
                value={product?.sp}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="cp">Cost Price:</label>
              <input
                type="number"
                style={{ color: "black" }}
                name="cp"
                placeholder="Enter Cost Price"
                required
                value={product?.cp}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="weight">Product Weight:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="weight"
                placeholder="Enter Product Weight"
                required
                value={product?.weight}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="vendor">Vendor:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="vendor"
                placeholder="Enter Vendor"
                required           
                value={product?.vendor}
                onChange={handleInputChange}
              />
            </div>

            <div className="input_box">
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                style={{ color: "black" }}
                name="brand"
                placeholder="Enter Brand"
                required
                value={product?.brand}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="input_box">
            <label for="phone">Product Description:</label>
            <ReactQuill type="text" id="phone" required theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
              style={{ color: "black", padding: "30px", }} />
          </div>
          <button type="submit" className="reg_btn" style={{ backgroundColor: "#d19fe8" }}>
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