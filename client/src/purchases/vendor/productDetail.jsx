
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/features/vendors/vendorSlice";
import DOMPurify from "dompurify"
import "../../components/detail.css"

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
                    <div style={{display:"flex", flexDirection:'column'}}><div className="big-img">
                        {product?.image ? (
                            <img
                                src={product.image.filePath}
                                alt={product.image.fileName}
                            />
                        ) : (
                            <p>No image set for this product</p>
                        )}
                    </div>
                    <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price"> Email : </b> {product.email}
                        </p>
                    </div>
                    

                    <div className="box" style={{display:"flex",justifyContent:"flex-start",flexDirection:"column"}}>
                        <div className="row">
                            <h2 style={{ color: "black" }}>{product.name}</h2>
                            <span><b>${product.price}</b></span>
                        </div>
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px"}}><b>Product Availability:{stockStatus(product.quantity)} </b></p>
                        
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price"> phone no.: </b> {product.phone}
                        </p>
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price"> Address .: </b> {product.Address}
                        </p>
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price"> Payment Term.: </b> {product.paymentterm}
                        </p>
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price"> Bank Name: </b> {product.bankname}
                        </p>
                        <p className="product-price" style={{ color: "black",border:"2px solid black",padding:"7px" ,borderRadius:"6px" }}>
                            <b className="product-price">Bank account: </b> {product.bankaccount}
                        </p>
                      

                       


                        <p style={{ color: "black" ,border:"2px solid black",padding:"7px",borderRadius:"6px" }} className="product-description"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description),
                            }}
                        ></p>
                        <hr />
                      



                    </div>
                </div>

            )}
        </div>
    )
}

export default ProductDetail