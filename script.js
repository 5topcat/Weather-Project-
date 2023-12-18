
const apiKey = 'ADD_YOUR_APIKEY_HERE';// add your apikey here
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            alert('Failed to fetch weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    // Update the weather icon source based on the weather condition code
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.src = iconUrl;

    // Display temperature and description
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
}