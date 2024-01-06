import React from "react";
import { Box, Typography, useTheme, Avatar, SvgIcon } from "@mui/material";
import FlexBetween from "../components/FlexBetween";




const StatBox = ({ title, count, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
     height="190px"
     padding="20px 20px 20 rem"
      flex="1 1 100%"
      boxShadow=" black 0px 0px 0px 2px inset, rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "
      backgroundColor="black"
      borderRadius="10px"
      border="3px solid black"


    >
      <div style={{ display: "flex", flexDirection: "column",marginTop:"6px", justifyContent: "center" }}>
        <div><SvgIcon sx={{
          
          height: 26,
          width: 26
        }}>
          {icon}
        </SvgIcon></div>
        
        <Typography variant="h6" sx={{ color: "white",fontSize:"1.7rem",padding:"4px" }}>
          {title}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="600"
          sx={{ color: "white",fontSize:"1.4rem",padding:"4px" }}
        >
          {count}
        </Typography>


        <Typography sx={{ color: "white",fontSize:"1.2rem",paddingBottom:"4px" }}>{description}</Typography></div>


    </Box>
  );
};

export default StatBox;