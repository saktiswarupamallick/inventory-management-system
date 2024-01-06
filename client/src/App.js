
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { useEffect, useState } from "react";
import './App.css';
import Layout from "./components/layout/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navigate } from "react-router-dom";
import 'antd/dist/reset.css';
import useInitApp from "./invoice/hook/useInitApp";
import Forgotpassword from "./pages/Forgotpassword";
import Kanban from "./pages/kanban"
import Dashboard from "./pages/Dashboard";
import Income from "./expense/Components/Income/Income";
import Expenses from "./expense/Components/Expenses/Expenses";
import ClientListScreen from "./invoice/pages/clients/ClientListScreen";
import DashboardScreen from "./invoice/pages/DashboardScreen";
import ProductListScreen from "./invoice/pages/products/ProductListScreen";
import InvoiceListScreen from "./invoice/pages/invoices/InvoiceListScreen";
import InvoiceDetailScreen from "./invoice/pages/invoices/InvoiceDetailScreen";
import ClientDeleteConfirm from "./invoice/components/Clients/ClientDeleteConfirm";
import ClientEditModal from "./invoice/components/Clients/ClientEditModal";
import ProductDeleteConfirm from "./invoice/components/Product/ProductDeleteConfirm";
import ProductEditModal from "./invoice/components/Product/ProductEditModal";
import ClientChooseModal from "./invoice/components/Clients/ClientChooseModal";
import ProductChoosenModal from "./invoice/components/Product/ProductChoosenModal";
import InvoiceSettingModal from "./invoice/components/Invoice/InvoiceSettingModal";
import InvoiceConfirmModal from "./invoice/components/Invoice/InvoiceConfirmModal";
import InvoiceDeleteConfirm from "./invoice/components/Invoice/InvoiceDeleteConfirm";
import PageLoading from "./invoice/components/Common/PageLoading";
import CreateProduct from "./pages/admins/CreateProduct";
import EditProduct from "./pages/admins/UpdateProduct";
import ProductDetail from "./components/productDetail";
import Products from "./pages/admins/ProductTable";
import Createvendor from "./purchases/vendor/CreateProduct"
import Vendors from "./purchases/vendor/ProductTable"
import EditVendor from "./purchases/vendor/UpdateProduct"
import VendorDetail from "./purchases/vendor/productDetail"
import ClientForm from "./orders/clientForm";
import Clienttable from './orders/clientTable'
import CustomerForm from "./customers/customerform";
import CustomerTable from "./customers/customertable";
import PurchaseForm from "./purchases/purchaseorder/purchaseform";
import Purchasetable from "./purchases/purchaseorder/purchasetable";
import Deliveryform from "./orders/deliverychalan/deliveryform";
import Deliverytable from "./orders/deliverychalan/deliverytable";
import CreditnoteForm from "./orders/creditnotes/creditnoteform";
import CreditnoteTable from "./orders/creditnotes/creditnotetable";
import Creditnoteupdate from "./orders/creditnotes/creditnoteupdate";





function App() {

  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };


  const [theme, colorMode] = useMode();
  const { initialSetData } = useInitApp();


  useEffect(() => {
    initialSetData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme} >
            <CssBaseline />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/clientform" element={<ClientForm />} />
                <Route path="/clienttable" element={<Clienttable />} />
                
                <Route path="/purchaseform" element={<PurchaseForm />} />
                <Route path="/purchasetable" element={<Purchasetable />} />

                <Route path="/customerform" element={<CustomerForm />} />
                <Route path="/customertable" element={<CustomerTable />} />
                
                <Route path="/creditnoteform" element={<CreditnoteForm />} />
                <Route path="/creditnotetable" element={<CreditnoteTable />} />
                <Route path="/updatecreditnote/:id" element={<Creditnoteupdate />} />

                <Route path="/deliveryform" element={<Deliveryform />} />
                <Route path="/deliverytable" element={<Deliverytable />} />

                <Route path="/kanban" element={<Kanban />} />
                <Route path="/expense" element={<Expenses />} />
                <Route path="/income" element={<Income />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/productlist" element={<Products />} />
                <Route path="/vendorlist" element={<Vendors />} />

                <Route
                  path="/product-detail/:id"
                  element={
                    <ProductDetail />
                  }
                />
                <Route
                  path="/vendor-detail/:id"
                  element={
                    <VendorDetail />
                  }
                />
                <Route
                  path="/edit-product/:id"
                  element={
                    <EditProduct />
                  }
                />
                <Route
                  path="/edit-vendor/:id"
                  element={
                    <EditVendor />
                  }
                />

                
                <Route path="/createproduct" element={<CreateProduct />} />
                <Route path="/createvendor" element={<Createvendor />} />

                <Route path="/invodash" element={<DashboardScreen />} />

                <Route path="clients" element={<ClientListScreen />}></Route>

                <Route path="products" element={<ProductListScreen />}></Route>

                <Route path="invoices">
                  <Route path="" element={<InvoiceListScreen />} exact />
                  <Route path=":id" element={<InvoiceDetailScreen />} />
                </Route>



                <Route path="*" element={<Navigate to="/" replace />} />

              </Route>

              <Route path="/signin" element={<Login />} />

              <Route path="/forgotpassword" element={<Forgotpassword />} />
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>

        <ClientDeleteConfirm />
        <ClientEditModal />
        <ClientChooseModal />
        <ProductDeleteConfirm />
        <ProductEditModal />
        <ProductChoosenModal />
        <InvoiceSettingModal />
        <InvoiceConfirmModal />
        <InvoiceDeleteConfirm />
        <PageLoading />
      </BrowserRouter>
    </div>
  );
}

export default App;
