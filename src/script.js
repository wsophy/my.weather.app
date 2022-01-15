let now = new Date();
let day = now.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = now.getDate();
let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let hours = now.getHours();
if (hours < 10) {hours = `0${hours}`;}
let mins = now.getMinutes();
if (mins < 10) {mins = `0${mins}`;}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${days[day]} ${date} ${months[month]}`;

let time = document.querySelector("#current-time");
time.innerHTML = `${hours}:${mins}`;

//week 5
function searchCity (event) {
event.preventDefault();
let city = document.querySelector ("#search-city-input").value;
search(city);
} 
// make an API call to OpenWeather API
function search(city){
let endpointUrl = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiKey ="18b30d8f2f5b2ccbe094edcd7e5304da";   
let searchUrl=`${endpointUrl}&q=${city}&appid=${apiKey}&units=${units}`;    
axios.get(`${searchUrl}`).then(showTemperature);
}

// Once I get the HTTP response, we display the city name and the temperature
function showTemperature(response){
  let tempIndex = Math.round(response.data.main.temp);
  document.querySelector ("#cityIndex").innerHTML=response.data.name;
  let heading = document.querySelector("#degree");
  heading.innerHTML=`${tempIndex}`;
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);

}
let form = document.querySelector ("#search-form");
form.addEventListener("submit", searchCity);

search("Perth");

//Bonus

function searchPosition(position){
    let endpointUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units="metric";
    let apiKey ="18b30d8f2f5b2ccbe094edcd7e5304da";
    let apiUrl=`${endpointUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(showWeather);
}

function showPosition(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchPosition);
}
function showWeather(response){
  document.querySelector ("#cityIndex").innerHTML=response.data.name;
  let tempIndex = Math.round(response.data.main.temp);
  let heading = document.querySelector("#degree");
  heading.innerHTML=`${tempIndex}`;
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed)
}

let currentButton = document.querySelector ("#currentLocation");
currentButton.addEventListener("click", showPosition);