import React, { useEffect, useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Avatar } from "@mui/material";
import ReactPaginate from "react-paginate";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {

  deleteProduct,
  getProducts,
} from "../../redux/features/vendors/vendorSlice";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../redux/features/product/filterSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";



const VendorList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="maintable" >
      <main className="table">
        <FlexBetween>
          <Header title="Tasklist" subtitle="List of Tasks" />
          <Search

            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />


        </FlexBetween>
        <section className="table__body">
          <table className=".grid-container">
            <thead>
              <tr >
                <th style={{ color: "black" }}>S/N</th>
                <th style={{ color: "black" }}>Name</th>
                <th style={{ color: "black" }}>email</th>
                <th style={{ color: "black" }}>phone no.</th>
                <th style={{ color: "black" }}>payment term</th>
                <th style={{ color: "black" }}>Address</th>

                <th style={{ color: "black" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => {
                const { _id, name, email, phone, Address, paymentterm } = product;
                return (
                  <tr style={{ border: "2px solid black" }} key={_id}>
                    <td>{index + 1}</td>
                    <td>{shortenText(name, 16)}</td>
                    <td>{email}</td>
                    <td><strong>

                      {phone}</strong>
                    </td>
                    <td>{Address}</td>
                    <td>

                      {paymentterm}
                    </td>
                    <td className="icons" >
                      <span>
                        <Link to={`/vendor-detail/${_id}`}>
                          <Avatar style={{ border: "3px solid black" }}
                            sx={{
                              backgroundColor: '#d19fe8',
                              height: 36,
                              width: 36
                            }}
                          >
                            <VisibilityRoundedIcon size={25} style={{ color: "black" }} />
                          </Avatar>
                        </Link>
                      </span>
                      <span>
                        <Link to={`/edit-vendor/${_id}`}>
                          <Avatar style={{ border: "3px solid black" }}
                            sx={{
                              backgroundColor: '#d19fe8',
                              height: 36,
                              width: 36
                            }}
                          >
                            <EditRoundedIcon size={20} style={{ color: "black" }} /></Avatar>
                        </Link>
                      </span>
                      <span>
                        <Avatar style={{ border: "3px solid black" }}
                          sx={{
                            backgroundColor: '#d19fe8',
                            height: 36,
                            width: 36
                          }}
                        >
                          <DeleteRoundedIcon
                            size={20}
                            style={{ color: "black" }}
                            onClick={() => confirmDelete(_id)}
                          />
                        </Avatar>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main></div>
  );
};

export default VendorList;