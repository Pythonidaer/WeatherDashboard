$( document ).ready(function() {
  // Add submitted search queries into an array of city names
  let searchArr = [];
  // Declare variable to eventually be used as query parameter
  let cityname;
  // WeatherAPI key, if this does not work after 1/31/2021 Just create one with OpenWeatherAPI and replace.
  let APIKEY = 'c18d5d2e20b21d5580498fa1824aba22';
  // Luxon Library to get local time and alias;
  let DateTime = luxon.DateTime;
  let dt = DateTime.local();
  // toISODate() appeasr to be YYYY-MM-DD
  let todaysDate = dt.toISODate();
  // 5-Day Forecast
  let forecastD1 = dt.plus({ days: 1 }).toISODate()
  let forecastD2 = dt.plus({ days: 2 }).toISODate()
  let forecastD3 = dt.plus({ days: 3 }).toISODate()
  let forecastD4 = dt.plus({ days: 4 }).toISODate()
  let forecastD5 = dt.plus({ days: 5 }).toISODate()

  // Get storage object by key name and parse it
  function getCityBtn() {
    searchArr = JSON.parse(localStorage.getItem("cities"));
    // If it exists, create a button for each array item and log it to the #search-list div
    if (searchArr) {
      for (let i = 0; i < searchArr.length; i++) {
        let citySearch = $(`<button>${searchArr[i]}</button>`).addClass('btn btn-outline-secondary bg-white w-100 city-btn').attr('type', 'button');
        $('#search-list').append(citySearch);
      }
      // If there is no storage object, make sure searchArr is still just an empty array.
    } else {
      searchArr = [];
    }
    // This helps me figure out what the first cityname is on the list to try and pre-populate
    // cityname = searchArr[0];
    // console.log(cityname);
    
  }
  getCityBtn();

// Top date in white card, 5-Day Forecast in bottom blue tiles
  function headingDates() {
    // today's weather
    $('#current-date').text(todaysDate)
    // 5-Day Forecast Dates:
    $('#forecast-d1').text(forecastD1)
    $('#forecast-d2').text(forecastD2)
    $('#forecast-d3').text(forecastD3)
    $('#forecast-d4').text(forecastD4)
    $('#forecast-d5').text(forecastD5)
  }
  headingDates();


  // Make submit button take value, add it to an array, clear screen, and make a button, then add to storage
  $('#search-btn').on('click', function(event) {
    event.preventDefault();
    // User's input search is the query parameter cityname
    let savedSearch = $('#search-input').val();
    cityname = savedSearch;
    // City weather is queryURL, and 5-Day forecast is the weeklyForecast;
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + `&appid=${APIKEY}&units=imperial`;
    let weeklyForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + `&appid=${APIKEY}&units=imperial`;

    // Call ajax when search icon is clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Popular top card weather data
      $('#city').text(response.name);
      function todaysWeather() {
          $('#current-temp').text(response.main.temp);
          $('#current-humidity').text(response.main.humidity);
          $('#current-wind-speed').text(response.wind.speed);
      }
      todaysWeather();
      // Store key values lattitude and longitude because we are going to use that to search for UV data
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      // Query the one call API to obtain UV Index data
      let uvURL = "https://api.openweathermap.org/data/2.5/onecall?" + `lat=${lat}&` + `lon=${lon}&` + `appid=${APIKEY}&units=imperial`;
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(uvIndex) {
        $('#current-uvi').text(uvIndex.current.uvi);
        // change UVI background by scale, making background green, yellow, etc.
        function uvIndexScale() {
          let uvScale = $('.uv-scale');
          let currentUV = parseFloat($('#current-uvi').text()) // float
          if (currentUV < 3) {
            uvScale.addClass("uv-low");
          } else if (currentUV >= 3 && currentUV < 6) {
            uvScale.addClass("uv-moderate");
          } else if (currentUV >= 6 && currentUV < 8) {
            uvScale.addClass("uv-high");
          } else if (currentUV >= 8 && currentUV < 11) {
            uvScale.addClass("uv-very-high");
          } else if (currentUV >= 11) {
            uvScale.addClass("uv-extreme");
          };
        }; 
        uvIndexScale();
      });
    });
    // Use same cityname to call the 5-day Weather Forecast
    $.ajax({
      url: weeklyForecast,
      method: "GET"
    }).then(function(response) {
      // Depending on the weather's main description word, populate the corresponding image
      function setWeatherIcons() {
        let dayIconsURL = "http://openweathermap.org/img/wn/";
        let weatherDescArr = [
        response.list[3].weather[0].main,
        response.list[11].weather[0].main,
        response.list[19].weather[0].main,
        response.list[27].weather[0].main,
        response.list[35].weather[0].main
        ];
        let day = 1;
        for (let i = 0; i < weatherDescArr.length; i++) {
          if (weatherDescArr[i] === "Clouds") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '03d@2x.png');
          } else if (weatherDescArr[i] === "Clear") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '01d@2x.png');
          } else if (weatherDescArr[i] === "Snow") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '13d@2x.png');
          } else if (weatherDescArr[i] === "Rain") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '10d@2x.png');
          } else if (weatherDescArr[i] === "Drizzle") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '09d@2x.png');
          } else if (weatherDescArr[i] === "Thunderstorm") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '11d@2x.png');
          } else {
            $(`#img-d${day}`).attr('src', dayIconsURL + '50d@2x.png');
          }
          day++;
        }
      }
      setWeatherIcons();

      // 5 day forecast, Temp: & Humidity:
      function fiveDayForecast() {
        // Current day + 1 12:00:00
        $('#temp-d1').text(response.list[3].main.temp);
        $('#humidity-d1').text(response.list[3].main.humidity);
        // Current day + 2 12:00:00
        $('#temp-d2').text(response.list[11].main.temp);
        $('#humidity-d2').text(response.list[11].main.humidity);
        // Current day + 3 12:00:00
        $('#temp-d3').text(response.list[19].main.temp);
        $('#humidity-d3').text(response.list[19].main.humidity);
        // Current day + 4 12:00:00
        $('#temp-d4').text(response.list[27].main.temp);
        $('#humidity-d4').text(response.list[27].main.humidity);
        // Current day + 5 12:00:00
        $('#temp-d5').text(response.list[35].main.temp);
        $('#humidity-d5').text(response.list[35].main.humidity);
      }
      fiveDayForecast();
    });

    // Each city search that has been added to the array, stringify that array and set to local storage
    function storeCityBtn() {
      localStorage.setItem("cities", JSON.stringify(searchArr));
    }
    
    // Add searched city into the array (from beginning), clear input value, add button to search-list
    function createCityBtn() {
      searchArr.unshift(savedSearch);
      $('#search-input').val('');
      let citySearch = $(`<button>${searchArr[0]}</button>`).addClass('btn btn-outline-secondary bg-white w-100 city-btn').attr('type', 'button');
      $('#search-list').prepend(citySearch);
      storeCityBtn();
      hearCityBtn();
    }

    if (savedSearch.length !== 0) {
      createCityBtn();
    }
  })

  // For each city button in the #search-list, if it's clicked then get the weather
  function hearCityBtn() {
    $('.city-btn').each(function() {
      $(this).on('click', function() {
        console.log(this.innerText);

        let savedSearch = this.innerText;
    
        cityname = savedSearch;
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + `&appid=${APIKEY}&units=imperial`;
        let weeklyForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + `&appid=${APIKEY}&units=imperial`;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $('#city').text(response.name);
          function todaysWeather() {
              $('#current-temp').text(response.main.temp);
              $('#current-humidity').text(response.main.humidity);
              $('#current-wind-speed').text(response.wind.speed);
        }
        todaysWeather();
              let lat = response.coord.lat;
              let lon = response.coord.lon;
              let uvURL = "https://api.openweathermap.org/data/2.5/onecall?" + `lat=${lat}&` + `lon=${lon}&` + `appid=${APIKEY}&units=imperial`;
                  $.ajax({
                    url: uvURL,
                    method: "GET"
                  }).then(function(uvIndex) {
                    $('#current-uvi').text(uvIndex.current.uvi);
                    function uvIndexScale() {
                      let uvScale = $('.uv-scale');
                      let currentUV = parseFloat($('#current-uvi').text()) // float
                      if (currentUV < 3) {
                        uvScale.addClass("uv-low");
                      } else if (currentUV >= 3 && currentUV < 6) {
                        uvScale.addClass("uv-moderate");
                      } else if (currentUV >= 6 && currentUV < 8) {
                        uvScale.addClass("uv-high");
                      } else if (currentUV >= 8 && currentUV < 11) {
                        uvScale.addClass("uv-very-high");
                      } else if (currentUV >= 11) {
                        uvScale.addClass("uv-extreme");
                      };
                    }; 
                    uvIndexScale();
          });
        });
        
        $.ajax({
          url: weeklyForecast,
          method: "GET"
        }).then(function(response) {
          function setWeatherIcons() {
            let dayIconsURL = "http://openweathermap.org/img/wn/";
            let weatherDescArr = [
            response.list[3].weather[0].main,
            response.list[11].weather[0].main,
            response.list[19].weather[0].main,
            response.list[27].weather[0].main,
            response.list[35].weather[0].main
            ];
            let day = 1;
            for (let i = 0; i < weatherDescArr.length; i++) {
              if (weatherDescArr[i] === "Clouds") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '03d@2x.png');
              } else if (weatherDescArr[i] === "Clear") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '01d@2x.png');
              } else if (weatherDescArr[i] === "Snow") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '13d@2x.png');
              } else if (weatherDescArr[i] === "Rain") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '10d@2x.png');
              } else if (weatherDescArr[i] === "Drizzle") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '09d@2x.png');
              } else if (weatherDescArr[i] === "Thunderstorm") {
                $(`#img-d${day}`).attr('src', dayIconsURL + '11d@2x.png');
              } else {
                $(`#img-d${day}`).attr('src', dayIconsURL + '50d@2x.png');
              }
              day++;
            }
          }
          setWeatherIcons();
    
          // 5 day forecast, Temp: & Humidity:
          function fiveDayForecast() {
            // Current day + 1 12:00:00
            $('#temp-d1').text(response.list[3].main.temp);
            $('#humidity-d1').text(response.list[3].main.humidity);
            // Current day + 2 12:00:00
            $('#temp-d2').text(response.list[11].main.temp);
            $('#humidity-d2').text(response.list[11].main.humidity);
            // Current day + 3 12:00:00
            $('#temp-d3').text(response.list[19].main.temp);
            $('#humidity-d3').text(response.list[19].main.humidity);
            // Current day + 4 12:00:00
            $('#temp-d4').text(response.list[27].main.temp);
            $('#humidity-d4').text(response.list[27].main.humidity);
            // Current day + 5 12:00:00
            $('#temp-d5').text(response.list[35].main.temp);
            $('#humidity-d5').text(response.list[35].main.humidity);
          }
          fiveDayForecast();
        });

      })
    })
  }
  hearCityBtn();

  // When red trash icon is clicked, clear local storage, empty the search array, and erase city buttons
  $('#clear-btn').on('click', function(event) {
      event.preventDefault();
    $('#search-list').empty();
    localStorage.clear();
    searchArr = [];
  })
});
