import React from "react";
import "./side.css"
import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Image } from 'mui-image'
import Divider from '@mui/material/Divider';
import {
  ChevronLeft, Dashboard,
} from "@mui/icons-material";
import TimerIcon from '@material-ui/icons/Timer';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EventIcon from '@material-ui/icons/Event';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


const menuItem = [
  {
    path: "/",
    name: "Dashboard",
    icon: <Dashboard />
  },
   {
    path: "/createproduct",
    name: "Create product",
    icon: <MultilineChartIcon />
  },
  {
    path: "/productlist",
    name: "Product List",
    icon: <NoteAddIcon />
  },
  {
    path: "/deliveryform",
    name: "Delivery form",
    icon: <MultilineChartIcon />
  },
  {
    path: "/deliverytable",
    name: "Delivery table",
    icon: <NoteAddIcon />
  },
  {
    path: "/clientform",
    name: "Create Order",
    icon: <MultilineChartIcon />
  },
  {
    path: "/clienttable",
    name: "Orders List",
    icon: <NoteAddIcon />
  },
  {
    path: "/createvendor",
    name: "Create vendor",
    icon: <MultilineChartIcon />
  },
  {
    path: "/vendorlist",
    name: "Vendor List",
    icon: <NoteAddIcon />
  },
  {
    path: "/creditnoteform",
    name: "Create credits",
    icon: <MultilineChartIcon />
  },
  {
    path: "/creditnotetable",
    name: "creditnote List",
    icon: <NoteAddIcon />
  },


  {
    path: "/expense",
    name: "Expense",
    icon: <PaymentIcon />
  },
  {
    path: "/income",
    name: "Income",
    icon: <AccountBalanceWalletIcon />
  },
  ,

 
  {
    path: "/invodash",
    name: "Invoice",
    icon: <EventIcon />
  },
  {
    path: "invoices",
    name: "Invoice List",
    icon: <TimerIcon />
  },
  {
    path: "/customerform",
    name: "Customer form",
    icon: <TimerIcon />
  },
  {
    path: "/customertable",
    name: "CustomerTable",
    icon: <TimerIcon />
  },
  {
    path: "/purchaseform",
    name: "Purchaseform",
    icon: <TimerIcon />
  },
  {
    path: "/purchasetable",
    name: "PurchaseTable",
    icon: <TimerIcon />
  },
  {
    path: "clients",
    name: "Clients List",
    icon: <TimerIcon />
  },
  {
    path: "/kanban",
    name: "Tasklist",
    icon: <FormatListNumberedRtlIcon />
  }
 

]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" >
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{

            width: drawerWidth,
            "& .MuiDrawer-paper": {
              borderRight: "solid black ",
              color: "#ffffff",
              backgroundColor: "black",

              boxSixing: "border-box",
              borderWidth: isNonMobile ? "3px" : "3px",
              width: drawerWidth,

            },
          }}
        >
          <Box width="100%" >
            <Box m=" 1rem 0 2rem 1rem ">
              <FlexBetween color={"#1A1A1A"}>
                <Box display="flex" alignItems="center" gap="0.3rem">
                  <Image src="Logo.png" style={{ width: "160px", marginTop: "20px",marginLeft:"20px"}} />
                </Box>

                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ color: "#ffffff" }} />
                  </IconButton>
                )}

              </FlexBetween>  
            </Box>
            <Divider variant="middle" sx={{marginBottom:"40px"
                }} />
            <List>
              {
                menuItem.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link" >
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </NavLink>
                ))
              }
            </List>
            <Divider variant="middle" sx={{

              color: "white"

            }} />

          </Box>


        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;