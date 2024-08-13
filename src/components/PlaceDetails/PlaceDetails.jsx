import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import useStyles from './styles';

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected, refProp]);

  return (
    <Card elevation={6} ref={refProp}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, index) => (
          <Box key={index} display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOn />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
