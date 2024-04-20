// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProduct from './pages/CreateProduct';
import FindAllProduct from './pages/FindAllProduct';
import FindAndSort from './pages/FindAndSort';
import Compare from './pages/Compare';
import FilterByDate from './pages/FilterByDate';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FindAllProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/find-and-sort" element={<FindAndSort />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/filter-by-date" element={<FilterByDate />} />
      </Routes>
    </Router>
  );
}

export default App;
