require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// The first argument after 'node' and 'liri.js' will be the command the user would like to do
var command = process.argv[2];

// After the command, I build the user input
var userInput = "";

for (let i = 3; i < process.argv.length; i++){

    userInput += `${process.argv[i]} `

}

// Trims off the last space
userInput = userInput.trim();

function concertThis() {

    var bitURL = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`

        axios.get(bitURL).then(function(response) {

            var data = response.data;

            if (data == '') {

                console.log(`No upcoming events found for ${userInput}.`);
                fs.appendFile("log.txt", `No upcoming events found for ${userInput}.\n\n`, function(err){});
                
            } else {

                console.log(`Showing upcoming events for ${userInput}:\n`);
                fs.appendFile("log.txt", `Showing upcoming events for ${userInput}:\n\n`, function(err){});

                for (let i = 0; i < data.length; i++) {
                    
                    console.log(`Venue: ${data[i].venue.name}`);
                    fs.appendFile("log.txt", `Venue: ${data[i].venue.name}\n`, function(err){});

                    console.log(`Location: ${data[i].venue.city}, ${data[i].venue.country}`);
                    fs.appendFile("log.txt", `Location: ${data[i].venue.city}, ${data[i].venue.country}\n`, function(err){});

                    console.log(`Date: ${moment(data[i].datetime).format('MM/DD/YYYY')}\n`);
                    fs.appendFile("log.txt", `Date: ${moment(data[i].datetime).format('MM/DD/YYYY')}\n\n`, function(err){});
                    
                }

            }

        })

}

function spotifyThis() {

    if (userInput == '') {
        userInput = "The Sign Ace of Base";
        console.log("No song was provided. Defaulting to 'The Sign' by Ace of Base.\n");
        fs.appendFile("log.txt", "No song was provided. Defaulting to 'The Sign' by Ace of Base.\n\n", function(err){});
    }

    spotify.search({
        type: 'track',
        query: userInput,
        limit: 5
    }, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
          }
         
        console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
        fs.appendFile("log.txt", `Artist: ${response.tracks.items[0].artists[0].name}\n`, function(err){});

        console.log(`Song: ${response.tracks.items[0].name}`);
        fs.appendFile("log.txt", `Song: ${response.tracks.items[0].name}\n`, function(err){});

        console.log(`Album: ${response.tracks.items[0].album.name}`);
        fs.appendFile("log.txt", `Album: ${response.tracks.items[0].album.name}\n`, function(err){});

        console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)
        fs.appendFile("log.txt", `Preview Link: ${response.tracks.items[0].external_urls.spotify}\n\n`, function(err){});

    })

}

function movieThis() {

    if (userInput == '') {
        userInput = "Mr. Nobody"
        console.log("No movie was provided. Defaulting to 'Mr. Nobody.'\n");
        fs.appendFile("log.txt", "No movie was provided. Defaulting to 'Mr. Nobody.'\n\n", function(err){});
    }

    var omdbURL = `http://www.omdbapi.com/?t=${userInput}&plot=short&apikey=trilogy`

    axios.get(omdbURL)
        .then(function(response) {

            console.log(`Title: ${response.data.Title}`);
            fs.appendFile("log.txt", `Title: ${response.data.Title}\n`, function(err){});

            console.log(`Year: ${response.data.Year}`);
            fs.appendFile("log.txt", `Year: ${response.data.Year}\n`, function(err){});

            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            fs.appendFile("log.txt", `IMDB Rating: ${response.data.Ratings[0].Value}\n`, function(err){});

            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            fs.appendFile("log.txt", `Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}\n`, function(err){});

            console.log(`Country: ${response.data.Country}`);
            fs.appendFile("log.txt", `Country: ${response.data.Country}\n`, function(err){});

            console.log(`Language: ${response.data.Language}`);
            fs.appendFile("log.txt", `Language: ${response.data.Language}\n`, function(err){});

            console.log(`Synopsis: ${response.data.Plot}`);
            fs.appendFile("log.txt", `Synopsis: ${response.data.Plot}\n`, function(err){});

            console.log(`Actors: ${response.data.Actors}`);
            fs.appendFile("log.txt", `Actors: ${response.data.Actors}\n\n`, function(err){});

        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
        })

}

function runLIRI() {

    switch (command) {

        case "concert-this":
    
            concertThis();
            
            break;
    
        case "spotify-this":
    
            spotifyThis();
    
            break;
    
        case "movie-this":
    
            movieThis();
    
            break;
    
        case "do-what-it-says":
    
            fs.readFile("random.txt", "utf8", function(error, data) {
    
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }
    
                // Split the data by commas into an array
                var dataArr = data.split(",");
    
                command = dataArr[0];
                userInput = dataArr[1];

                runLIRI();
    
            })
    
            break;
    
        default:
            
            console.log("Not a valid command, please try again. Valid commands are: 'concert-this', 'spotify-this-song', 'movie-this', and 'do-what-it-says'.")
    
            break;
    }

}

runLIRI();