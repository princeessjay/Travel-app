import axios from 'axios';
// Function to fetch places data based on boundary coordinates
export const getPlacesData = async (type, sw, ne) => {
    try {
        
        console.log('Sending request to Travel Advisor API...');
        console.log('Southwest:', sw, 'Northeast:', ne);

        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        console.log('Full Response:', response); // Log the complete response

        const { data } = response.data;
        console.log('Received places data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching places data:', error.response?.data || error.message);
        return []; // Return an empty array on error
    }
};

// Function to fetch weather data based on latitude and longitude
export const getWeatherData = async (lat, lng) => {
    try {
        if (lat && lng) {
            console.log('Sending request to Weather API...');
            console.log('Latitude:', lat, 'Longitude:', lng);

            // Correct the endpoint and ensure proper query parameter formatting
            const response = await axios.get(`'https://open-weather28.p.rapidapi.com/location/22.9012/88.3899/weather?lat=${lat}&lon=${lng}`, {
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
                    'x-rapidapi-host': 'open-weather28.p.rapidapi.com',
                },
            });

            console.log('Full Weather Response:', response); // Log the complete response
            console.log('Received weather data:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);
    }
};
