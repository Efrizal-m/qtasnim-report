// src/pages/Find All Product.tsx
import React, { useState, useEffect} from 'react';
import '../App.css'; // Import CSS file
import axios from 'axios';
import moment from 'moment'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function FindAllProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [products]);


  const handleUpdate = (id: any) => {
    navigate(`/update-product/${id}`);
  }

  const handleDelete = async (id: any) => {
    await axios.delete(`http://localhost:3001/api/v1/product/${id}`)
    Swal.fire({
      text: "Succesfully delete data!",
      icon: "success"
    });
  }


  return (
    <div>
      <Navbar />
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
                <button onClick={() => handleUpdate(product.id)}>Update</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FindAllProduct;
