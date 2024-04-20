// src/components/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          Qtasnim Product Management
        </Typography>
        <Button component={Link} to="/create-product" color="inherit" style={{ textDecoration: 'none', marginRight: '1rem' }}>Create Product</Button>
        {/* <Button component={Link} to="/compare" color="inherit" style={{ textDecoration: 'none', marginRight: '1rem' }}>Product List</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;