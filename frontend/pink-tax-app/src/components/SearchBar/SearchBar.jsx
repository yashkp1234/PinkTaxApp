import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/result=${input}`);
  };

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input value={input} placeholder="Enter product here ..." onChange={(e) => setInput(e.target.value)} />
      </div>

      <div className="search__buttons">
        <Button type="submit" variant="outlined" onClick={search} className="searchButton">Pink Tax Search</Button>
      </div>
    </form>
  );
}
