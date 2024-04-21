// src/pages/UpdateProduct.tsx
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormHelperText } from '@mui/material';
import '../App.css'; // Import CSS file
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_barang: '',
    stok: '',
    jumlah_terjual: '',
    tanggal_terjual: '',
    jenis_barang: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/product/detail/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [id]);
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/api/v1/product/${id}`, formData);
    Swal.fire({
      text: "Succesfully update data!",
      icon: "success"
    });
    navigate('/')
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" className="form-container">
        <Typography variant="h4" align="center" gutterBottom>
          Product Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            label="Nama Barang"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nama_barang"
            value={formData.nama_barang}
            onChange={handleChange}
          />
          <TextField
            required
            label="Stok"
            variant="outlined"
            fullWidth
            margin="normal"
            name="stok"
            type="number"
            value={formData.stok}
            onChange={handleChange}
          />
          <TextField
            required
            label="Jumlah Terjual"
            variant="outlined"
            fullWidth
            margin="normal"
            name="jumlah_terjual"
            type="number"
            value={formData.jumlah_terjual}
            onChange={handleChange}
          />
          <div style={{ width: '100%' }}>
            <Select
              required
              variant="outlined"
              fullWidth
              margin="none"
              name="jenis_barang"
              value={formData.jenis_barang}
              onChange={handleChange}
            >
              <MenuItem value="Konsumsi">Konsumsi</MenuItem>
              <MenuItem value="Pembersih">Pembersih</MenuItem>
            </Select>
            <FormHelperText>Jenis Barang*</FormHelperText>
          </div>
          <div style={{ width: '100%' }}>
            <TextField
              required
              variant="outlined"
              fullWidth
              margin="normal"
              name="tanggal_terjual"
              type="date"
              value={formData.tanggal_terjual}
              onChange={handleChange}
            />
            <FormHelperText>Tanggal Terjual*</FormHelperText>
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default UpdateProduct;
