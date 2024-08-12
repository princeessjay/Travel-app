import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

export const getPlacesData = async (type, sw, ne) => {
    try {
        console.log('Sending request to Travel Advisor API...');
        console.log('Southwest:', sw, 'Northeast:', ne);

        const response = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                type: type,
            },
            headers: {
                'x-rapidapi-key': '82b77ba888msh34e75893c784612p14c766jsn91ad9b2b697e',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        console.log('Full Response:', response); // Log the complete response

        const { data: { data } } = response;
        console.log('Received places data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching places data:', error.response?.data || error.message);
        return []; // Return an empty array on error
    }
};

export const getWeatherData = async (lat, lng) => {
    try {
        if (lat && lng) {
            console.log('Sending request to Weather API...');
            console.log('Latitude:', lat, 'Longitude:', lng);

            const response = await axios.get('https://open-weather13.p.rapidapi.com/city/latlon/30.438/-89.1028', {
                params: { lat, lon: lng },
                headers: {
                    'x-rapidapi-key': '82b77ba888msh34e75893c784612p14c766jsn91ad9b2b697e',
                    'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
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
