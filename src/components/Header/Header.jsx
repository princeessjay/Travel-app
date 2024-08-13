import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StyledToolbar, TitleTypography, SearchBox, SearchIconWrapper, StyledInputBase } from './styles';

function Header({ setCoords }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoords({ lat, lng });
      } else {
        console.error("Place details are not available.");
      }
    }
  };

  return (
    <AppBar position='static'>
      <StyledToolbar>
        <TitleTypography variant='h5'>
          Travel Advisor
        </TitleTypography>
        <Box display="flex">
          <TitleTypography variant='h6'>
            Explore new places
          </TitleTypography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <SearchBox>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder='Search ...' />
            </SearchBox>
          </Autocomplete>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
