
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM content to load before adding event listener
    document.getElementById('songForm').addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Get the value entered by the user in the input field
        var songName = document.getElementById('songName').value;
        
        // Call your JavaScript function and pass the songName value
        myFunction(songName);

        document.getElementById('songName').value = '';
    });
});


// Define your JavaScript function that will receive the song name
function myFunction(songName) {
    // Your logic goes here
    console.log('User entered song name:', songName);
    // Make a request to the Wikipedia API
      const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles='+songName+'&format=json';
    //var apiUrl = 'https://en.wikipedia.org/w/rest.php/v1/search/title?q=' + encodeURIComponent(songName) + '&limit=1';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the response data
            console.log('Wikipedia API response:', data);
            processWikipediaResponse(data);
            // You can now extract and display information about the song from the Wikipedia response
        })
        .catch(error => {
            console.error('Error fetching data from Wikipedia API:', error);
            // Handle errors gracefully
        });
    // You can now perform further actions like making API requests, etc.
}

// Process the response data from the Wikipedia API
function processWikipediaResponse(data) {
    if (data && data.pages && data.pages.length > 0) {
        // Iterate through the array of pages
        data.pages.forEach(page => {
            // Extract the title and excerpt of the Wikipedia article
            var title = page.title; // Title of the Wikipedia article
            var excerpt = page.excerpt; // Excerpt of the Wikipedia article
            // Log or display the extracted information
            console.log('Title:', title);
            console.log('Excerpt:', excerpt);
            // You can perform further actions with the extracted information
        });
    } else {
        console.log('No pages found in the Wikipedia API response.');
    }
}

// Call this function after fetching data from the Wikipedia API
//processWikipediaResponse(yourApiResponseObject);