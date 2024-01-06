import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/features/product/filterSlice";
import productReducer from "../redux/features/product/productSlice";
import vendorReducer from  "../redux/features/vendors/vendorSlice"
import clientsReducer from "../invoice/store/clientSlice";
import productRedicer from "../invoice/store/productSlice"
import invoiceReducer from "../invoice/store/invoiceSlice";
import ordersReducer from "./features/ordersTable/orderReducer"
import companyReducer from "./features/company/companyReducer";
import customerReducer from "./features/customers/customerReducer";
import purchaseReducer from "./features/purchases/purchaseReducer"
import deliveryReducer from "./features/deliverychalan/deliveryReducer"
import creditnoteReducer from "./features/creditnote/creditNoteReducer"




export const store = configureStore({ 
  reducer: {
    creditnote: creditnoteReducer,
    deliverychallan:deliveryReducer,
    customer: customerReducer,
    company: companyReducer,
    order:ordersReducer,
    vendor:vendorReducer,
    clients: clientsReducer,
    products: productRedicer,
    invoices: invoiceReducer,
    product: productReducer,
    filter: filterReducer,
    purchase: purchaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
 
 
});