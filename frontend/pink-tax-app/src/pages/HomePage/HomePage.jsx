/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import SearchBar from '../../components/SearchBar/SearchBar';

import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__body">
        <Typography variant="h1" textAlign="center" color="#c44569">Pink Tax App</Typography>
        <div className="home__inputContainer">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
