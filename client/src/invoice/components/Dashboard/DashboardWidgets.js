import React from "react";
import LottieMoney from "../LotiIcon/LottieMoney";
import LottieProduct from "../LotiIcon/LottieProduct";
import LottieInvoice from "../LotiIcon/LottieInvoice";
import LottiePersons from "../LotiIcon/LottiePersons";
import { useSelector } from "react-redux";
import { getAllClientsSelector } from "../../store/clientSlice";
import { getAllProductSelector } from "../../store/productSlice";
import {
  getAllInvoiceSelector,
  getTotalBalance,
} from "../../store/invoiceSlice";
import NumberFormat from "react-number-format";

function DashboardWidgets() {
  const clients = useSelector(getAllClientsSelector);
  const products = useSelector(getAllProductSelector);
  const totalBalance = useSelector(getTotalBalance);
  const allInvoices = useSelector(getAllInvoiceSelector);

  return (
    <>
      <div className="flex mb-8 justify-around flex-wrap">
        <div style={{ border: "3px solid black",backgroundColor:"#d19fe8",borderRadius:"10px" ,boxShadow: " black 0px 0px 0px 2px inset,  rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} className="w-full mr-12  BrightUbe mb-3 md:w-1/4">
          
          <div className="p-4  rounded-xl md:mr-4 hover:shadow-sm">
            <div style={{ color: "black" }} className="font-title font-bold">Total Balance</div>
            <div className="flex flex-col justify-center items-center">
              {/* Icon */}
              <div className="h-30">
              <LottieInvoice loop className="h-20" />
              </div>
              {/* Icon Finished */}
              <div className="text-2xl mr-2">
                <NumberFormat
                  style={{ color: "black" }}
                  value={totalBalance}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>${value}</span>}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ border: "3px solid black" , backgroundColor:"yellow" ,borderRadius:"10px", boxShadow: " black 0px 0px 0px 2px inset,  rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} className="w-full BrightUbe mr-12 mb-3 md:w-1/4">
          <div className="p-4  rounded-xl md:mr-4 hover:shadow-sm">
            <div style={{ color: "black" }} className="font-title font-bold">Total Invoices</div>
            <div className="flex flex-col justify-center items-center">
              {/* Icon */}
              <div className="h-30">
                <LottieInvoice loop className="h-20" />
              </div>
              {/* Icon Finished */}
              <div className="text-2xl mr-2">
                <NumberFormat
                  style={{ color: "black" }}
                  value={allInvoices?.length}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ border: "3px solid black", backgroundColor:"black",borderRadius:"10px" ,boxShadow: " black 0px 0px 0px 2px inset, rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px ",paddingBottom:"20px"}} className="w-full  justify-around mb-3 md:w-1/4">
          <div className="p-4  rounded-xl hover:shadow-sm">
            <div style={{ color: "white" }} className="font-title font-bold">Total Clients</div>
            <div className="flex flex-col justify-center items-center">
              {/* Icon */}
              <div className="h-30">
                <LottiePersons loop className="h-20" />
              </div>
              {/* Icon Finished */}
              <div className="text-2xl mr-2">
                <NumberFormat
                  style={{ color: "white" }}
                  value={clients?.length}
                  className=""
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <span {...props}>{value}</span>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardWidgets;
