const API_KEY = 'YOUR_API_KEY_HERE';
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const errorContainer = document.getElementById('errorContainer');
const initialState = document.getElementById('initialState');

const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const uv = document.getElementById('uv');
const lastUpdated = document.getElementById('lastUpdated');

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

cityInput.focus();

async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        cityInput.focus();
        return;
    }
    
    setLoadingState(true);
    
    try {
        const data = await fetchWeatherData(city);
        displayWeatherData(data);
        applyDynamicTheme(data);
    } catch (error) {
        showError();
        resetTheme();
    } finally {
        setLoadingState(false);
    }
}

async function fetchWeatherData(city) {
    const url = `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=pt`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return response.json();
}

function displayWeatherData(data) {
    const { location, current } = data;
    
    cityName.textContent = location.name;
    country.textContent = `${location.region ? location.region + ', ' : ''}${location.country}`;
    
    weatherIcon.src = `https:${current.condition.icon.replace('64x64', '128x128')}`;
    weatherIcon.alt = current.condition.text;
    temp.textContent = Math.round(current.temp_c);
    condition.textContent = current.condition.text;
    feelsLike.textContent = `Sensação térmica: ${Math.round(current.feelslike_c)}°C`;
    
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_kph} km/h`;
    pressure.textContent = `${current.pressure_mb} mb`;
    uv.textContent = current.uv;
    
    const updateTime = new Date(current.last_updated);
    lastUpdated.textContent = `Última atualização: ${formatDateTime(updateTime)}`;
    
    hideAll();
    weatherContainer.classList.remove('hidden');
}

function applyDynamicTheme(data) {
    const { location, current } = data;
    
    const localTime = location.localtime;
    const hour = parseInt(localTime.split(' ')[1].split(':')[0]);
    
    const tempC = current.temp_c;
    const isDay = current.is_day === 1;
    const conditionCode = current.condition.code;
    
    resetTheme();
    
    let theme = '';
    
    if (!isDay) {
        if (isCloudyCondition(conditionCode)) {
            theme = 'theme-night-cloudy';
        } else {
            theme = 'theme-night-clear';
        }
    } 
    else if (hour >= 17 && hour <= 19) {
        theme = 'theme-sunset';
    } 
    else if (hour >= 5 && hour <= 7) {
        theme = 'theme-sunrise';
    }
    else if (isRainyCondition(conditionCode)) {
        theme = 'theme-day-rainy';
    }
    else if (isCloudyCondition(conditionCode)) {
        theme = 'theme-day-cloudy';
    }
    else if (tempC >= 30) {
        theme = 'theme-day-hot';
    }
    else if (tempC <= 10) {
        theme = 'theme-day-cold';
    }
    else {
        theme = 'theme-day-clear';
    }
    
    document.body.classList.add(theme);
}

function resetTheme() {
    const themes = [
        'theme-day-clear',
        'theme-day-hot',
        'theme-day-cold',
        'theme-day-cloudy',
        'theme-day-rainy',
        'theme-night-clear',
        'theme-night-cloudy',
        'theme-sunset',
        'theme-sunrise'
    ];
    themes.forEach(t => document.body.classList.remove(t));
}

function isCloudyCondition(code) {
    const cloudyCodes = [1003, 1006, 1009, 1030, 1135, 1147];
    return cloudyCodes.includes(code);
}

function isRainyCondition(code) {
    const rainyCodes = [
        1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195,
        1198, 1201, 1240, 1243, 1246, 1273, 1276
    ];
    return rainyCodes.includes(code);
}

function showError() {
    hideAll();
    errorContainer.classList.remove('hidden');
}

function hideAll() {
    weatherContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    initialState.classList.add('hidden');
}

function setLoadingState(isLoading) {
    if (isLoading) {
        document.body.classList.add('loading');
        searchBtn.disabled = true;
    } else {
        document.body.classList.remove('loading');
        searchBtn.disabled = false;
    }
}

function formatDateTime(date) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('pt-BR', options);
}
