let input = document.getElementById("input");
let button = document.getElementById("btn");
let cityName = document.getElementById("cityName");
let dateElement  = document.getElementById("date");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let weatherEl = document.getElementById("weather");
let weatherIcon = document.getElementById("weather-icon");
let error = document.getElementById("error");
let toggleModeBtn = document.getElementById("toggleModeBtn");




const getTemperature = (cityname) =>
{
const promise =fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=Metric&appid=2aac4db8c572652979de802f004c42fb`);

promise
.then((response) => {
    if(!response.ok)
    {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display= "none";
    }
    else
       return response.json();
})
.then((response)=>{
       const {main}=response;
       const {description}=response;
       cityName.innerText= cityname;
       updateClock();
       temperature.innerText=(main.feels_like+ " 'c");
       humidity.innerText= ("Humidity:" + main.humidity + " %" );
       weatherEl.innerText=description;
     

       ////////////////////////weather condition ////////////
    const weatherCondition = response.weather[0].main;
if (weatherCondition === "Clear") {
    weatherEl.innerText="It's sunny!";
    weatherIcon.src="images/sunny.png";

}
 else if (weatherCondition === "Clouds") {
    weatherEl.innerText="It's cloudy!";
    weatherIcon.src="images/cloudy.png";

   
} 
 else if (weatherCondition === "Rain") {
    weatherEl.innerText="It's Rainy!";
    weatherIcon.src="images/rainy.png";
    
   
} 
 else if (weatherCondition === "Mist") {
    weatherEl.innerText="It's Misty!";
    weatherIcon.src="images/misty.png";
    
   
} 

else {
    weatherEl.innerText="Weather condition : not available";;
}

})  .catch(error => {
   console.log(error);
  });
  
  document.querySelector('.error').style.display = "none";
  document.querySelector('.weather').style.display= "block";
};

button.addEventListener('click' , function(e)
{
    e.preventDefault();
    let cityname=input.value;
    getTemperature(cityname);
})

toggleModeBtn.addEventListener('click' ,function()
{
body.classList.toggle('dark-mode');
})
function updateClock() { 
    let currentDate = new Date();
    let date = currentDate.toDateString().slice(0, 15); 
    dateElement.innerText = date;
  }