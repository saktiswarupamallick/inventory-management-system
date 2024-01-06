import React, { useCallback, useMemo,useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation , useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useSelector } from "react-redux";
import HomeIcon from "../Icons/HomeIcon";
import ProductIcon from "../Icons/ProductIcon";
import InvoiceIcon from "../Icons/InvoiceIcon";
import ClientPlusIcon from "../Icons/ClientPlusIcon";
import {
  FaTh,
 
  FaUserAlt,
  FaRegChartBar,
 
  FaThList
} from "react-icons/fa";
import {
  Box,

  Drawer,
  IconButton,
  List,

  Typography,
  SvgIcon,
 
} from "@mui/material";
import { Image } from 'mui-image'
import {
  ChevronLeft,

} from "@mui/icons-material";

import { getCompanyData } from "../../store/companySlice";


const menuItem = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaTh />
  },
  {
    path: "/createproduct",
    name: "Create Product",
    icon: <FaUserAlt />
  },
  {
    path: "/kanban",
    name: "Tasklist",
    icon: <FaRegChartBar />
  },
 
  {
    path: "/productList",
    name: "Product List",
    icon: <FaThList />
  }
]

const navDefaultClasses =
  "fixed inset-0 duration-200 transform lg:opacity-100 z-10 w-72 bg-white h-screen p-3";

const navItemDefaultClasses = "block px-4 py-2 rounded-md flex flex-1";

function Sidebar() {
  const { showNavbar, initLoading, toggleNavbar } = useAppContext();
  const { pathname } = useLocation();
  const company = useSelector(getCompanyData);

  const onClickNavbar = useCallback(() => {
    const width = window.innerWidth;

    if (width <= 767 && showNavbar) {
      toggleNavbar();
    }
  }, [showNavbar, toggleNavbar]);

 

  return (
    <>
      <nav
        className={
          showNavbar
            ? navDefaultClasses + " translate-x-0 ease-in"
            : navDefaultClasses + " -translate-x-full ease-out"
        }
      >
        <Box component="nav" >
     
        <Drawer
          
          variant="persistent"
          anchor="left"
          sx={{

            width: 280,
            "& .MuiDrawer-paper": {
              borderRight: "solid black ",
              color: "#ffffff",
              backgroundColor: "#1A1A1A",

              boxSixing: "border-box",
              
              width: 280,

            },
          }}
        >
          <Box width="100%" >
            <Box m=" 1rem 0 2rem 1rem ">
              
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Image src="logo.png" style={{ width: "180px"  , marginTop:"20px" }} />
                </Box>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: "start",
                backgroundColor: 'rgb(232,232,232)',
                border: "2px solid black",

                borderRadius: 2,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                m: 1,
                p: '8px'
              }}
            >
              <div>
                <Typography
                  color="#1A1A1A"
                  variant="h6"
                  fontWeight="bold"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Inventory
                </Typography>
                <Typography
                  color="#1A1A1A"
                  variant="body2"
                >
                  Dashboard
                </Typography>
              </div>
              <SvgIcon
                fontSize="small"
                sx={{ color: '#1A1A1A' }}
              >
               
              </SvgIcon>

            </Box>
            
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
           

          </Box>


        </Drawer>
 
    </Box>
        
      </nav>
    </>
  );
}

export default Sidebar;
