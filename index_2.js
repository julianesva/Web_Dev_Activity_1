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
        deleteInformation();
    });
});


// Define your JavaScript function that will receive the song name
function myFunction(songName) {
    // Your logic goes here
    console.log('User entered song name:', songName);
    // Make a request to the Wikipedia API
      const apiUrl = 'https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q='+songName+'&limit=1';
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
            generate_response(title, excerpt);
            // You can perform further actions with the extracted information
        });
    } else {
        console.log('No pages found in the Wikipedia API response.');
    }
}

// Call this function after fetching data from the Wikipedia API
//processWikipediaResponse(yourApiResponseObject);

function generate_response(title, excerpt) {
const endpoint_ai="https://api.openai.com/v1/chat/completions";
const opciones = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json','Authorization': 'Bearer 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' },
  body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{"role": "user", "content": "Give me more information about this song with this tittle:"+title+" and this additional information:"+excerpt}] })
};

let respuesta_chat= fetch(endpoint_ai,opciones).then( 

     function(respuesta){
         
    //  console.log(respuesta);
     return respuesta.json();
   }

).then (

   function (j){
            console.log("Estas aquiiii");
            const info = j.choices[0].message.content;
            console.log(info);
            display_info(info, title);
        }

);
}
 //console.log(algoDeWikipedia);

 function display_info(info, title){
    // Create a new paragraph element
    const tittle1 = document.createElement('h3');
    tittle1.setAttribute('id', 'tittle1');

    
    const paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'info');

    // Set the text content of the paragraph
    tittle1.textContent = title;
    paragraph.textContent = info;

    // Get the content div
    const contentDiv = document.getElementById('content');

    // Append the paragraph element to the content div
    contentDiv.appendChild(tittle1);
    contentDiv.appendChild(paragraph);

 }

 function deleteInformation() {
    // Get the paragraph element by its id
    const tittle = document.getElementById('tittle1');
    const infoParagraph = document.getElementById('info');

    // Check if the paragraph element exists
    if (infoParagraph && tittle) {
        // Remove the paragraph element from its parent node
        tittle.parentNode.removeChild(tittle);
        infoParagraph.parentNode.removeChild(infoParagraph);
    }
}
