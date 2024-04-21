import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';
import moment from 'moment'

const FilterByDate: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]); // Change 'any' to your data type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fetch data from backend API based on the selected date range
      const response = await axios.get(`http://localhost:3001/api/v1/product/filterByDate?startDate=${startDate}&endDate=${endDate}`); // Replace '/api/data' with your API endpoint
      setFilteredData(response.data); // Update state with filtered data
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="filter-container">
      <Typography variant="h4" align="center" gutterBottom>
        Filter By Date Range
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Filtering...' : 'Filter'}
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
              filteredData.map((item, index) => (
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
  );
};

export default FilterByDate;
