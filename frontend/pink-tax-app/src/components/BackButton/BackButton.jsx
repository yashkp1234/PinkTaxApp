import Button from '@mui/material/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const pinkCol = pink[400];

export default function BackButton() {
  const navigate = useNavigate();
  const onClick = (e) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="contained"
      sx={{ color: 'white', backgroundColor: pinkCol }}
      onClick={onClick}
    >
      Back
    </Button>
  );
}
