// DOM Elements

const time = document.querySelector('.time'),
fullDate = document.querySelector('.date'),
greeting = document.querySelector('.greeting'),
name = document.querySelector('.name'),
focus = document.querySelector('.focus'),
humidity = document.querySelector('.humidity'),
windSpeed = document.querySelector('.wind-speed'),
btn = document.querySelector('.btn');
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const folders = ['morning', 'day', 'evening', 'night']
let currentImage = 0;
let currentFolder = 0;
let i = 0;

//Time and date block
function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth(),
    weekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    fullDate.innerHTML = weekArr[day] + ', ' + date + ' ' + monthArr[month];
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(showTime, 1000);
} 

//Add zero
function addZero(n) {
    return (parseInt(n, 10) < 10? '0' : '') + n;
}

//Change background and Greeting
function setBgGreet() {
    let today = new Date(),
    hour = today.getHours();
    const img =  document.createElement('img');
//    let path = 

    

    if (hour >= 6 && hour <12) {
        //Morning
        img.src =  'assets/images/' + folders[0] + '/' + images[currentImage = ++currentImage % images.length];
        img.onload = () => {
            document.body.style.backgroundImage = 'url(assets/images/' + folders[0] + '/' + images[currentImage = ++currentImage % images.length] + ')';
        }

        greeting.textContent = 'Good Morning, ';
        
    } else if (hour >= 12 && hour < 18 ) {
        //Afternoon
        img.src =  'assets/images/' + folders[1] + '/' + images[currentImage = ++currentImage % images.length];
        img.onload = () => {
        document.body.style.backgroundImage = 'url(assets/images/' + folders[1] + '/' + images[currentImage = ++currentImage % images.length] + ')';
        }
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
        //Evening
        img.src =  'assets/images/' + folders[2] + '/' + images[currentImage = ++currentImage % images.length];
        img.onload = () => {
        document.body.style.backgroundImage = 'url(assets/images/' + folders[2] + '/' + images[currentImage = ++currentImage % images.length] + ')';
        }
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    } else {
        //Night
        img.src =  'assets/images/' + folders[3] + '/' + images[currentImage = ++currentImage % images.length];
        img.onload = () => {
        document.body.style.backgroundImage = 'url(assets/images/' + folders[3] + '/' + images[currentImage = ++currentImage % images.length] + ')';
        }
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    }
    setTimeout(setBgGreet, 3600000);
}

//background change
 function nextBg () {
    const img =  document.createElement('img');

    let today = new Date(),
    hour = today.getHours();
    let currentFolder = 0;
    
    if (hour >= 6 && hour <12) {
        currentFolder = 0 + i;
    } else if (hour >= 12 && hour < 18 ) {
        currentFolder = 1 + i;
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
    currentFolder = 2 + i  ;    
    } else {
        currentFolder = 3 + i;
    }

    img.src = 'assets/images/' + folders[currentFolder = ++currentFolder % folders.length] + '/' + images[currentImage = ++currentImage % images.length]


     img.onload = () => {
        document.body.style.backgroundImage = 'url(assets/images/' + folders[currentFolder = ++currentFolder % folders.length] + '/' + images[currentImage = ++currentImage % images.length] + ')';        
    }
        // document.body.style.backgroundImage = 'url(assets/images/' + folders[currentFolder = ++currentFolder % folders.length] + '/' + images[currentImage = ++currentImage % images.length] + ')';
        if (currentImage === 18) {
            if (i === 3) {
                i = 0;
            } else {
                i++;
            }
        }
 }

//get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter your name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//set name
function setName(e) {
    if (e.type === 'click') {
        name.innerText = '';
    } else if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) { 
            if (name.innerText.trim() === '') {
                getName();
            }
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        } 
    } else if (e.type === 'blur') {
        getName();
    }
}

//get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//set Focus
function setFocus(e) {
    if (e.type === 'click') {
        focus.textContent = '';
    } else if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (focus.textContent.trim() === '') {
                getFocus();
            }
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        getFocus();
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName)
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setFocus);
btn.addEventListener('click', nextBg);

//run
showTime();
setBgGreet();
getName();
getFocus();

//====================== Quote ======================//

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btn-quote');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

//====================== Wether ======================//

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=f7d56b717cf8f0d0605a97fd86743fcf&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data["message"] === "city not found") {
      city.textContent = 'city not found'
      weatherIcon.className = '';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      humidity.textContent = '';
      windSpeed.textContent = '';

  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
  }
  }
  

//get city
const getCity = () => {
    if (localStorage.getItem('city') === null) {
        city.textContent = "[Enter city]";
    } else {
        city.textContent = localStorage.getItem('city');
    }
};

//set city
const setCity = (e) => {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            if ((city.textContent).trim() === "") {
                getCity();
                city.blur();
            } else {
                localStorage.setItem('city', e.target.innerText);
                getWeather();
                city.blur();
            }
        }
    } else if (e.type === 'click') {   
        city.textContent = "";
    } else {
        getCity();
    }
};

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', setCity);
city.addEventListener('blur', setCity);

getCity()