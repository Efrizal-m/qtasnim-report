import React, { useState } from 'react';
import { Container, Typography, Box, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../components/Navbar';

const CompareProduct: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'least' | 'most'>('least');
  const [sortedData, setSortedData] = useState<any[]>([]); // Change 'any' to your data type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSortOrderChange = (e: any) => {
    setSortOrder(e.target.value as 'least' | 'most');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/product/compare?compareType=${sortOrder}`);
      setSortedData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <br /><br />
      <Container maxWidth="md" className="find-and-sort-container">
        <Typography variant="h4" align="center" gutterBottom>
          Compare Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="sort-order-label">Sort Order</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort Order"
            >
              <MenuItem value="least">Ascending</MenuItem>
              <MenuItem value="most">Descending</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>

        {/* Display filtered data in a table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Add table headers */}
                <TableCell>Nama Barang</TableCell>
                <TableCell>Stok</TableCell>
                <TableCell>Jumlah Terjual</TableCell>
                <TableCell>Tanggal Terjual</TableCell>
                <TableCell>Jenis Barang</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nama_barang}</TableCell>
                    <TableCell>{item.stok}</TableCell>
                    <TableCell>{item.jumlah_terjual}</TableCell>
                    <TableCell>{moment(item.tanggal_terjual).format("DD-MM-YYYY")}</TableCell>
                    <TableCell>{item.jenis_barang}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CompareProduct;
