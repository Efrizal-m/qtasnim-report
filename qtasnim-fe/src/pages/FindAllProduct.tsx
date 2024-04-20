// src/pages/Find All Product.tsx
import React, { useState, useEffect} from 'react';
import '../App.css'; // Import CSS file
import axios from 'axios';
import moment from 'moment'

function FindAllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/product');
        console.log(response,'<<<<<<<<<<')
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const handleRead = (product: any) => {

  }

  const handleUpdate = (product: any) => {
    
  }

  const handleDelete = (product: any) => {
    
  }


  return (
    <div>
      <nav className="navbar">
        <h1>Product List</h1>
      </nav>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Stok</th>
            <th>Jumlah Terjual</th>
            <th>Tanggal Transaksi</th>
            <th>Jenis Barang</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index) => (
            <tr key={index}>
              <td>{product.nama_barang}</td>
              <td>{product.stok}</td>
              <td>{product.jumlah_terjual}</td>
              <td>{moment(product.tanggal_terjual).format("DD-MM-YYYY")}</td>
              <td>{product.jenis_barang}</td>
              <td>
                <button onClick={() => handleRead(product)}>Detail</button>
                <button onClick={() => handleUpdate(product)}>Update</button>
                <button onClick={() => handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FindAllProduct;
