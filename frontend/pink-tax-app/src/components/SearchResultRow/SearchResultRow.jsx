import * as React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchResultCard from '../SearchResultCard/SearchResultCard';

import './SearchResultRow.css';

export default function SearchResultRow({
  title, data, avgPrice, colour,
}) {
  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ padding: '0.5%' }}>
        <Typography variant="h5">
          {title}
        </Typography>
        <Chip label={`Average Price: ${avgPrice}`} color={colour} />
      </Stack>
      <HorizontalScroll className="horizontalScroll">
        {data.map((obj) => <SearchResultCard {...obj} />)}
      </HorizontalScroll>
    </div>
  );
}
