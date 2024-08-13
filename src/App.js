import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";

const App = () => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng).then((data) => {
        if (data) {
          setWeatherData(data);
        }
      });

      console.log(`Fetching places of type: ${type}`);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log('Places data received:', data);
          if (data && data.length > 0) {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating('');
          } else {
            console.warn('No places data received.');
            setPlaces([]); // Ensure places is set to an empty array if no data
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching places data:', error);
          setPlaces([]); // Ensure places is set to an empty array if there's an error
          setIsLoading(false);
        });
    }
  }, [bounds, type]); // Ensure 'type' is included in the dependency array to trigger fetching on change

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoords({ lat, lng });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            setChildClicked={setChildClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
            childClicked={childClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
