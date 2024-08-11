import React from 'react'
import GoogleMapReact from 'google-map-react';
import { paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';

import Rating from '@mui/material'
import useStyles from './styles'


function Map( setCoordinates, setBounds, coordinates) {
  const classes = useStyles()
  const isMobile = useMediaQuery('(min-width:600px)')

  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCESEkD3EMLW0fme-4ySJht-QxSXhBGYVY'}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
      options={''}
      onChange={(e) => {
        console.log(e);
        setCoordinates({ lat: e.center.lat, lng: e.center.lng })
      }}
      onChildClick={''}
      >

      </GoogleMapReact>

    </div>
  )
}

export default Map