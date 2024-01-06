import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectLowQuantityProducts,
} from "../redux/features/product/productSlice";
import { Badge, IconButton, Menu, MenuItem, Typography,AppBar,Toolbar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import FlexBetween from "./FlexBetween";
import ArrowDropDownOutlined from "@mui/icons-material/ArrowDropDownOutlined";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const lowQuantityProducts = useSelector(selectLowQuantityProducts);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const isSettingsMenuOpen = Boolean(settingsAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const { logout } = useAuth0();

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSettingsAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        borderBottom: "3px solid black ",
        backgroundColor: "#ffffff"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
      <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          
        </FlexBetween>
        <FlexBetween gap="1.5rem" >
          <IconButton style={{color: "black"}} onClick={handleSettingsClick}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <Menu
            anchorEl={settingsAnchorEl}
            open={isSettingsMenuOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={() => logout()}>Log Out</MenuItem>
          </Menu>
          <IconButton style={{color: "black"}} onClick={handleNotificationClick}>
            <Badge badgeContent={lowQuantityProducts.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={isNotificationMenuOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem>
              <Typography variant="subtitle1" color="textSecondary">
                Products with Low Quantity:
              </Typography>
            </MenuItem>
            {lowQuantityProducts.map((product) => (
              <MenuItem key={product._id}>
                <Typography variant="body2">
                  {product.name} - Quantity: {product.quantity}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
