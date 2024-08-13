import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating, setChildClicked }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // Initialize refs for each place
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  useEffect(() => {
    // Scroll into view if childClicked is set
    if (childClicked !== null && elRefs[childClicked] && elRefs[childClicked].current) {
      elRefs[childClicked].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [childClicked, elRefs]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places.length ? (
              places.map((place, i) => (
                <Grid item key={i} xs={12}>
                  <PlaceDetails
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                    place={place}
                    setChildClicked={setChildClicked}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6">No places found.</Typography>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
