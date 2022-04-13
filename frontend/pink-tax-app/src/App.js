/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchResultPage from './pages/SearchResultPage/SearchResultPage';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<HomePage />} />
        <Route path="/result=:query" element={<SearchResultPage />} />
        <Route
          path="*"
          element={<Navigate to="/search" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
