
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/features/product/productSlice";
import DOMPurify from "dompurify"
import "./detail.css"

const ProductDetail = () => {


    const dispatch = useDispatch();

    const { id } = useParams();


    const { product, isError, message } = useSelector(
        (state) => state.product
    );

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span style={{ color: "green" }}>In Stock</span>;
        }
        return <span style={{ color: "red" }}>Out Of Stock</span>;
    };

    useEffect(() => {

        dispatch(getProduct(id));


        if (isError) {
            console.log(message);
        }
    }, [isError, message, dispatch]);




    return (
        <div className="app">

            {product && (
                <div className="details" >
                    <div className="big-img">
                        {product?.image ? (
                            <img
                                src={product.image.filePath}
                                alt={product.image.fileName}
                            />
                        ) : (
                            <p style={{ color: "black" }}>No image set for this product</p>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Product Type:</b> {product.type}
                            </p>
                            <p style={{ color: "black"  , justifyContent: "flex-start" }}>
                                <b>Unit:</b> {product.unit}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Manufacturer:</b> {product.manufacturer}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Vendor:</b> {product.vendor}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>UPC:</b> {product.upc}
                            </p>
                            <p style={{ color: "black" , alignItems: "flex-start" }}>
                                <b>MPN:</b> {product.mpn}
                            </p>
                            <p style={{ color: "black"  , alignItems: "flex-start"}}>
                                <b>EAN:</b> {product.ean}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>ISBN:</b> {product.isbn}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Weight:</b> {product.weight}
                            </p>
                           
                            <p>
                                <b>Cost Price:</b> {product.cp}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Selling Price:</b> {product.sp}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Prefered vendor:</b> {product.vendor}
                            </p>
                            <p style={{ color: "black" , justifyContent: "flex-start" }}>
                                <b>Brand:</b> {product.brand}
                            </p>

                        </div>

                    </div>

                    <div className="box" style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                        <div className="row">
                            <h2 style={{ color: "black" }}>{product.name}</h2>
                            <span><b>${product.price}</b></span>
                        </div>
                        <p className="product-price" style={{ color: "black", border: "2px solid black", padding: "7px", borderRadius: "6px" }}><b>Product Availability:{stockStatus(product.quantity)} </b></p>
                        <p className="product-price" style={{ color: "black", border: "2px solid black", padding: "7px", borderRadius: "6px" }}>
                            <b className="product-price"> SKU : </b> {product.sku}
                        </p>
                        <p className="product-price" style={{ color: "black", border: "2px solid black", padding: "7px", borderRadius: "6px" }}>
                            <b className="product-price"> Total Quantity: </b> {product.quantity}
                        </p>

                        <p className="product-price" style={{ color: "black", border: "2px solid black", padding: "7px", borderRadius: "6px" }}>
                            <b className="product-price" style={{ color: "black" }}> Total Value in stock : </b> {"$"}
                            {product.cp * product.quantity}
                        </p>


                        <p style={{ color: "black", border: "2px solid black", padding: "7px", borderRadius: "6px" }} className="product-description"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description),
                            }}
                        ></p>
                        <hr />
                        <div><code style={{ color: "black" }} className="--color-dark">
                            Created on: {product.createdAt.toLocaleString("en-US")}
                        </code></div>
                        <br />
                        <div><code style={{ color: "black" }} className="--color-dark">
                            Last Updated: {product.updatedAt.toLocaleString("en-US")}
                        </code></div>



                    </div>
                </div>

            )}
        </div>
    )
}

export default ProductDetail