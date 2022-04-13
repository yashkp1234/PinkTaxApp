import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchResultRow from '../../components/SearchResultRow/SearchResultRow';
import getProductsHook from '../../hooks/categoryDataHook';
import BackButton from '../../components/BackButton/BackButton';

import './SearchResultPage.css';

const TOP_5_TITLE = 'Top 10 Best Products';
const MENS_TITLE = 'Male Targeted Products';
const WOMENS_TITLE = 'Female Targeted Products';

export default function SearchResultPage() {
  const [data, setData] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    async function fetchData() {
      const a = await getProductsHook(query);
      if (a) { setData(a); }
    }
    fetchData();
    return () => {};
  }, []);

  return data === null ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Box
        sx={{
          width: '90vw',
          height: '90vh',
          marginTop: '2%',
          marginBottom: '2%',
          marginLeft: '5%',
          marginRight: '5%',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <CircularProgress style={{ padding: '10px' }} size={300} />
          <h1 style={{ textAlign: 'center' }}>Loading ...</h1>
        </div>
      </Box>
    </Grid>
  ) : (
    <Box
      sx={{
        width: '90vw',
        height: '90vh',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: 'rgba(255, 0, 0, 0.2);',
        '&:hover': {
          backgroundColor: 'rgba(255, 0, 0, 0.2);',
        },
      }}
    >
      <Typography variant="h2" textAlign="center">
        Results for
        {' '}
        {query}
      </Typography>
      {data && (
        <Grid container sx={{ padding: '2% 5%' }}>
          <BackButton />
          <Grid item xs={12}>
            <SearchResultRow
              {...{
                data: data.bestData,
                title: TOP_5_TITLE,
                avgPrice: data.avgBestPrice,
                colour: 'primary',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SearchResultRow
              {...{
                data: data.maleData,
                title: MENS_TITLE,
                avgPrice: data.avgMalePrice,
                colour: 'secondary',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SearchResultRow
              {...{
                data: data.femaleData,
                title: WOMENS_TITLE,
                avgPrice: data.avgFemalePrice,
                colour: 'warning',
              }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
