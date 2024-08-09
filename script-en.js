document.addEventListener('DOMContentLoaded', function() {
  const scrollers = document.querySelectorAll(".scroller");
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const videos = document.querySelectorAll('.live video');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  let currentVideoIndex = 0;

  // If a user hasn't opted in for reduced motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

 

  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);

      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

 

  // Corrected toggleButtons event listener
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      scrollers.forEach(scroller => {
        scroller.style.display = 'none';
      });
    });
  });

  function showVideo(index) {
    videos.forEach(video => {
      video.classList.remove('active-video');
      video.pause(); // Pause all videos
    });
    videos[index].classList.add('active-video');
    videos[index].play();
  }
  
  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    showVideo(currentVideoIndex);
    
  }

  function previousVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    showVideo(currentVideoIndex);
  }

  leftArrow.addEventListener('click', previousVideo);
  rightArrow.addEventListener('click', nextVideo);

  

  // New functionality to load video from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const videoSrc = urlParams.get('video');
  
  if (videoSrc) {
    const video = document.querySelector('.vd');
    video.src = decodeURIComponent(videoSrc);
    video.play();
  }
});
const videos = [
  { src: 'vd.mp4', title: 'Live🔴 ', description: 'Join us for an exciting live event where we\'ll dive into engaging discussions, share valuable insights, and interact with our amazing community in real-time.' },
  { src: 'vd2.mp4', title: 'Exciting Show', description: 'Don\'t miss out on our latest show where we cover a variety of interesting topics and interviews.' },
  { src: 'vd3.mp4', title: 'Trending Topics', description: 'Stay updated with the latest trends and discussions happening around the world.' },
  { src: 'vd4.mp4', title: 'Cultural Spotlight', description: 'Discover diverse cultures and traditions from around the world in this eye-opening exploration' },
  { src: 'vd5.mp4', title: 'Tech Innovations', description: ' the latest trends in health and wellness, offering tips and insights for a balanced lifestyle.' },
  { src: 'vd6.mp4', title: 'Creative Inspirations', description: 'Get inspired by creative minds as they share their processes, ideas, and artistic journeys.' }
];

let currentIndex = 0;

function updateContent() {
  const videoPlayer = document.getElementById('video-player');
  const videoLink = document.getElementById('video-link');
  const liveTitle = document.getElementById('live-title');
  const liveDescription = document.getElementById('live-description');

  videoPlayer.src = videos[currentIndex].src;
  videoLink.href = `test.html?video=${videos[currentIndex].src}`;
  liveTitle.textContent = videos[currentIndex].title;
  liveDescription.textContent = videos[currentIndex].description;
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  updateContent();
}

function prevVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateContent();
}

document.addEventListener('DOMContentLoaded', updateContent);

function toggleSidebar() {
  const overlay = document.querySelector('.overlay');
  const toggle = document.querySelector('.toggle-btn');
  const html = document.querySelector('html');
  // Toggle the 'open' class on the overlay
  overlay.classList.toggle('open');
  html.classList.toggle('open');
  toggle.classList.toggle('active')
  // Update the toggle button content based on the overlay's state
  if (overlay.classList.contains('open')) {
      
      toggle.innerHTML = "✕"; // Change to "✕" when sidebar is open
  } else {
      toggle.innerHTML = "☰"; // Change to "☰" when sidebar is closed
  }
}
const alts = document.querySelectorAll('.a');
const links = document.querySelectorAll('.lin');

alts.forEach((alt, index) => {
  alt.addEventListener('click', () => {
    links[index].classList.toggle("active");
  });
});

const API_KEY = 'fad48d510ce1477d8b4125843240308'; // Replace with your actual API key
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-button');
const tabs = document.querySelectorAll('.tab');
const weatherContent = document.querySelector('.weather-content');
let currentLocation = '';
let weatherData = null;

function getUserLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }),
                error => {
                    console.error("Error getting location:", error);
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

async function fetchWeather(query) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=2`);
        weatherData = await response.json();
        updateWeatherData(0);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherData(forecastDay) {
    if (!weatherData) return;

    const day = weatherData.forecast.forecastday[forecastDay];
    const current = forecastDay === 0 ? weatherData.current : day.day;

    document.querySelector('.temperature').textContent = `${Math.round(forecastDay === 0 ? current.temp_c : current.avgtemp_c)}°C`;
    document.querySelector('.condition').textContent = forecastDay === 0 ? current.condition.text : day.day.condition.text;
    document.querySelector('.location').textContent = weatherData.location.name;
    
    const date = new Date(day.date);
    document.querySelector('.date').textContent = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    document.querySelector('.time').textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
    document.querySelector('.day').textContent = forecastDay === 0 ? 'Today' : 'Tomorrow';
    
    document.querySelector('.wind').textContent = `${forecastDay === 0 ? current.wind_kph : day.day.maxwind_kph} km/h`;
    document.querySelector('.wind-dir').textContent = forecastDay === 0 ? current.wind_dir : 'N/A';
    document.querySelector('.humidity').textContent = `${forecastDay === 0 ? current.humidity : day.day.avghumidity}%`;
    document.querySelector('.real-feel').textContent = `${Math.round(forecastDay === 0 ? current.feelslike_c : day.day.avgtemp_c)}°C`;
    document.querySelector('.uv-index').textContent = forecastDay === 0 ? current.uv : day.day.uv;
    document.querySelector('.pressure').textContent = `${forecastDay === 0 ? current.pressure_mb : 'N/A'} mb`;
    document.querySelector('.rain-chance').textContent = `${day.day.daily_chance_of_rain}%`;
    
    // Update weather icon
    const iconElement = document.querySelector('.weather-icon');
    iconElement.textContent = getWeatherIcon(forecastDay === 0 ? current.condition.code : day.day.condition.code);
}

function getWeatherIcon(conditionCode) {
    const iconMap = {
        1000: '☀️', // Sunny
        1003: '🌤️', // Partly cloudy
        1006: '☁️', // Cloudy
        1009: '☁️', // Overcast
        1030: '🌫️', // Mist
        1063: '🌦️', // Patchy rain possible
        1066: '🌨️', // Patchy snow possible
        1069: '🌨️', // Patchy sleet possible
        1072: '🌨️', // Patchy freezing drizzle possible
        1087: '🌩️', // Thundery outbreaks possible
        1114: '🌨️', // Blowing snow
        1117: '🌨️', // Blizzard
        1135: '🌫️', // Fog
        1147: '🌫️', // Freezing fog
        1150: '🌧️', // Patchy light drizzle
        1153: '🌧️', // Light drizzle
        1168: '🌧️', // Freezing drizzle
        1171: '🌧️', // Heavy freezing drizzle
        1180: '🌧️', // Patchy light rain
        1183: '🌧️', // Light rain
        1186: '🌧️', // Moderate rain at times
        1189: '🌧️', // Moderate rain
        1192: '🌧️', // Heavy rain at times
        1195: '🌧️', // Heavy rain
        1198: '🌨️', // Light freezing rain
        1201: '🌨️', // Moderate or heavy freezing rain
        1204: '🌨️', // Light sleet
        1207: '🌨️', // Moderate or heavy sleet
        1210: '🌨️', // Patchy light snow
        1213: '🌨️', // Light snow
        1216: '🌨️', // Patchy moderate snow
        1219: '🌨️', // Moderate snow
        1222: '🌨️', // Patchy heavy snow
        1225: '🌨️', // Heavy snow
        1237: '🌨️', // Ice pellets
        1240: '🌧️', // Light rain shower
        1243: '🌧️', // Moderate or heavy rain shower
        1246: '🌧️', // Torrential rain shower
        1249: '🌨️', // Light sleet showers
        1252: '🌨️', // Moderate or heavy sleet showers
        1255: '🌨️', // Light snow showers
        1258: '🌨️', // Moderate or heavy snow showers
        1261: '🌨️', // Light showers of ice pellets
        1264: '🌨️', // Moderate or heavy showers of ice pellets
        1273: '🌩️', // Patchy light rain with thunder
        1276: '🌩️', // Moderate or heavy rain with thunder
        1279: '🌩️', // Patchy light snow with thunder
        1282: '🌩️', // Moderate or heavy snow with thunder
    };
    return iconMap[conditionCode] || '❓'; // Default icon if code is not found
}

async function initWeather() {
    try {
        const location = await getUserLocation();
        currentLocation = `${location.lat},${location.lon}`;
        await fetchWeather(currentLocation);
    } catch (error) {
        console.error("Couldn't get user location:", error);
        // Fallback to a default location
        currentLocation = 'Dhaka, Bangladesh';
        await fetchWeather(currentLocation);
    }
}

searchButton.addEventListener('click', async function() {
    currentLocation = searchInput.value;
    await fetchWeather(currentLocation);
});

searchInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        currentLocation = this.value;
        await fetchWeather(currentLocation);
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const forecastDay = this.dataset.tab === 'today' ? 0 : 1;

        weatherContent.classList.add('fade'); // Add fade class
        setTimeout(() => {
            updateWeatherData(forecastDay);
            weatherContent.classList.remove('fade'); // Remove fade class after updating
        }, 500); // Duration of the fade effect in milliseconds
    });
});

// Initialize weather based on user's location
initWeather();
function showWeatherSection() {
  const weatherSection = document.querySelector('.weather-section');
  weatherSection.classList.toggle('show');
  weatherSection.style.marginTop="30px";
}

function sendMessage() {
  var message = document.getElementById('message').value;
  
  var templateParams = {
      to_email: 'ayoubpro066@gmail.com',
      message: message
  };

  emailjs.send('service_37hz76a', 'template_bh0e43s', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          document.querySelector('.email-form').style.display="none";
          document.querySelector(".last").innerHTML="Thank you..❤️"
      }, function(error) {
          console.log('FAILED...', error);
          alert('Failed to send message. Please try again.');
      });
}
(function() {
    emailjs.init('u5C0JUy5j0rxkkC72');
})();















