import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

const Categoryform = ({ handleSubmit, Value, setValue }) => {

  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>



                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={Value}
                    label="Category name"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#ED7014",
                color: "#ffffff", mt: 3, mb: 2 , boxShadow: "rgb(0,0,0) 5px 5px",
                border: "2px solid black" }}
              >
                Create Category
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Categoryform