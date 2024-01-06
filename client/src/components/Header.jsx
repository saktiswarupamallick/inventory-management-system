import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h4"
        color="#1A1A1A"
        fontWeight="bold"
        sx={{ mb: "5px" ,fontFamily:'Poppins'}}
       
      >
        {title}
      </Typography>
     
    </Box>
  );
};

export default Header;
