# WeatherDashboard
*General Weather search utilizing OpenWeatherAPI calls, localStorage and jQuery*

[View Deployed Application Here.](https://pythonidaer.github.io/WeatherDashboard/)

## Installation
1. Clone repository to your local device
2. Test by opening the index.html file in your browser. If it looks good, it's working right.
3. If it does not work, right-click Inspect console to determine if there is an issue with the directories.
4. If code runs but Inspector logs error, you may need to go to OpenWeatherAPI to sign up for a new API key.

## Usage
This repo is simply a homework assignment. Feel free to inspect the code and notice how I made a Weatherboard API
- Incorporating Luxon.js and using the math feature to add days and get time even considering new months
- Using jQuery to select elements more easily, and to add attributes with less code
- Nesting `$.ajax` calls to chain queries reliant on the parent Promise resolving correctly
- Bootstrap utilization for simple search/delete/buttons code including simple layout
- How to dynamically add a class to an element based on integer conditions sourced from an API call

## Credits
[UV Index Scale](https://www.epa.gov/sunsafety/uv-index-scale-0);

[World Clock](https://www.timeanddate.com/worldclock/);

[jQuery .addClass()](https://api.jquery.com/addclass/);

[MDN parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat);

[Degree HTML Code](https://www.toptal.com/designers/htmlarrows/math/degree-sign/);

[Current weather data](https://openweathermap.org/current#parameter);

[jQuery val()](https://www.w3schools.com/jquery/html_val.asp);

[Clear inputs after submission](https://stackoverflow.com/questions/14589193/clearing-my-form-inputs-after-submission);

[Create elements in jQuery](https://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery);

[Weather Conditions Codes](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2);

[5-day Weather Forecast](https://openweathermap.org/forecast5);

[Current Weather](https://openweathermap.org/current#parameter);

[One Call API](https://openweathermap.org/api/one-call-api);

[jQuery attr()](https://www.tutorialrepublic.com/faq/how-to-change-the-image-source-using-jquery.php#:~:text=Answer%3A%20Use%20the%20jQuery%20attr,img%3E%20tag)%20in%20jQuery.);

[JSON:API module](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module);

[UV Index Scale](https://www.epa.gov/sunsafety/uv-index-scale-0);

[How to ask a good Stack Overflow question](https://stackoverflow.com/help/how-to-ask);

[Font Awesome Icons](https://fontawesome.com/v4.7.0/icon/trash-o);

[Luxon Calendar Math](https://moment.github.io/luxon/docs/manual/math.html);

## Future Improvements
1. Make page load to top-most (most recent) city search
2. Change date syntax to represent MM/DD/YYYY
3. Specify location as to assure user that when they search 'Salem' it is 'MA' not 'OR' and whatnot
4. Test out other Weather APIs
5. Refactor code so that multiple of the same $.ajax() calls aren't made (it's extremely not-DRY)
6. Learn how to write AJAX calls within functions that can be called later (I tried but kept getting error)
7. Improve mobile responsiveness
8. Add Modal for when city cannot generate Weather
9. Research catch/try/error/resolve methods to utilize code for when Promises resolve negatively (then #8)
10. Recreate in Bulma, because Bootstrap is both amazing and somewhat an eye sore when it's out-of-the-box
  
## License
I've chosen an MIT License. Do what you'd like with this material.

#### The Website
![Weatherboard API](assets/images/screenshot.png)
![Lighthouse Rankings](assets/images/lighthouse.png)