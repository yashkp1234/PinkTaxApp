import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import './SearchResultCard.css';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

function truncate(str, n) {
  return (str.length > n) ? `${str.substr(0, n - 1)}...` : str;
}

export default function SearchResultCard({
  url, title, price, gender, imageURL,
}) {
  return (
    <Card sx={{
      height: '15vh', width: '20vw', margin: '0.1%', overflow: 'auto',
    }}
    >
      <Grid container>
        <Grid item xs sx={{ }}>
          <CardMedia
            className="topPads2"
            component="img"
            height="100vh"
            image={imageURL}
            alt={title}
          />
        </Grid>
        <Grid item xs>
          <CardContent sx={{ paddingTop: '0%', marginTop: '-2vh' }}>
            <p className="noPads topPads">
              Name:
              {' '}
              {truncate(title, 14)}
            </p>
            <p className="noPads">
              Price:
              {' '}
              {price}
            </p>
            <p className="noPads">
              Target:
              {' '}
              {gender}
            </p>
            <a className="noPads" href={url} target="_blank" rel="noopener noreferrer">Link</a>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
