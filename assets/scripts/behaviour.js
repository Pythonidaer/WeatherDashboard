$( document ).ready(function() {
  // alias luxon object for improved readability
  let DateTime = luxon.DateTime;
  let dt = DateTime.local();
  // Top row dedicated solely to today's weather
  let todaysDate = `${dt.month}/${dt.day}/${dt.year}`
  // 5-Day Forecast Dates:
  let forecastD1 = `${dt.month}/${dt.day + 1}/${dt.year}`
  let forecastD2 = `${dt.month}/${dt.day + 2}/${dt.year}`
  let forecastD3 = `${dt.month}/${dt.day + 3}/${dt.year}`
  let forecastD4 = `${dt.month}/${dt.day + 4}/${dt.year}`
  let forecastD5 = `${dt.month}/${dt.day + 5}/${dt.year}`

  function headintDates() {
    // today's weather
    $('#current-date').text(todaysDate)
    // 5-Day Forecast Dates:
    $('#forecast-d1').text(forecastD1)
    $('#forecast-d2').text(forecastD2)
    $('#forecast-d3').text(forecastD3)
    $('#forecast-d4').text(forecastD4)
    $('#forecast-d5').text(forecastD5)
  }
  headintDates();

    let cityname = "san francisco";
    let APIKEY = 'c18d5d2e20b21d5580498fa1824aba22';
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + `&appid=${APIKEY}&units=imperial`;
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log("City name: " + response.name);
    //   need to confirm dt is date time, and how to convert it into something readable or just use dayjs
    //   console.log(response.dt);
    // need to see if temp can be converted into farenheight
      console.log("Temperature Farenheit: " + response.main.temp);
      console.log("Humidity: " + response.main.humidity);
      console.log("Wind Speed: " + response.wind.speed);
    //   need to find UV index
    // need to find weather icon
    });


    
    $('.btn-city').on('click', function() {
        console.log($(this));
    })


// I want to next complete an AJAX request that console logs a response
/*
That response must include:
- city name
- The date (if not, dayjs)
- Temp (in Farenheit)
- Humidity
- Weather icon
- Wind Speed
- UV Index (color coded for favorable, moderate, or severe)
*/

// WHEN U OPEN WEATHER DASHBOARD IT POPULATES THE LAST SEARCHED CITY
// I want to type a query that receives input from the input search and queries based on that q="city"
// every time the search button is clicked, it acts as a to-do list and adds the city to the buttons field
// every time the button field is updated, it should set these to local storage, probably from an array
// each time the page is refreshed, it should display this list of buttons
// each button, when clicked, should call an ajax request for the weather for a query using its var q="city"
// it is not required, but a delete icon would be nice
// I want to be able to log individual pieces of data such as response.temperature
// Then I want to create an HTML empty template where the text content is populated from the API data values
// I also want the screen to be mostly blank save for the input field div for search
// on click of each city, the template repopulates so maybe a call function


/*

*/






























});