import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../components/Navbar';

const FindAndSort: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'nama_barang' | 'stok' | 'jumlah_terjual' | 'tanggal_terjual'>('nama_barang');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<any[]>([]); // Change 'any' to your data type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByChange = (e: any) => {
    setSortBy(e.target.value as 'nama_barang' | 'stok' | 'jumlah_terjual' | 'tanggal_terjual');
  };

  const handleSortOrderChange = (e: any) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/product/findAndSort?query=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
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
          Find and Sort Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
          <TextField
            label="Search Query"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={handleSortByChange}
              label="Sort By"
            >
              <MenuItem value="nama_barang">Nama Barang</MenuItem>
              <MenuItem value="stok">Stok</MenuItem>
              <MenuItem value="jumlah_terjual">Jumlah Terjual</MenuItem>
              <MenuItem value="tanggal_terjual">Tanggal Terjual</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="sort-order-label">Sort Order</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
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

export default FindAndSort;
