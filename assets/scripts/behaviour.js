$( document ).ready(function() {
    console.log( "ready!" );

    $('.btn-city').on('click', function() {
        console.log($(this));
    })


// I want to next complete an AJAX request that console logs a response
/*
That response must include:
- The date (if not, dayjs)
- Temp (in Farenheit)
- Humidity
- Weather icon
- Wind Speed
- UV Index
*/

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