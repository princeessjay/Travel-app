import React from 'react';
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StyledToolbar, TitleTypography, SearchBox, SearchIconWrapper, StyledInputBase } from './styles';

function Header() {
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
          {/* <Autocomplete> */}
          <SearchBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search ...' />
          </SearchBox>
          {/* </Autocomplete> */}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
