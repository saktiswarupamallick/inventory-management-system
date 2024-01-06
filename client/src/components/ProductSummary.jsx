import React, { useEffect } from "react";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import NotInterestedRoundedIcon from '@material-ui/icons/NotInterestedRounded';
import StatBox from "./Statbox";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, useTheme,useMediaQuery,
 
} from "@mui/material";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../redux/features/product/productSlice";

export const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

const ProductSummary = ({ products }) => {

  

  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="150px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Products"
          count={products.length}
          
          description="Since last updated"
          icon={ < ShoppingCartRoundedIcon  />}
           
        />
        <StatBox
          title="Total Store value"
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          
          description="Since last updated"
          icon={ <StoreRoundedIcon />}

        />
        <StatBox
          title="Out of Stock"
          count={outOfStock}
          
          description="Since last updated"
          icon={ <NotInterestedRoundedIcon />}

        />
        <StatBox
          title="All Categories"
          count={category.length}
          
          description="Since last updated"
          icon={ <AssignmentRoundedIcon />}

        />
      </Box>
  )
}

export default ProductSummary