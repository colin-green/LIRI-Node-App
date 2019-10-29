# LIRI-Node-App

LIRI stands for "Language Interpretation & Recognition Interface" and has 4 commands that allow users to get information on artists, songs, and movies.

The 4 commands are "concert-this," "spotify-this," "movie-this," and "do-what-it-says." I will give a run down of how each command works.

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal and the log.txt text file:

     * Name of the venue

     * Venue location

     * Date of the Event (in MM/DD/YYYY format)

2. `node liri.js spotify-this '<song name here>'`

   * This will show the following information about the song in your terminal/bash window and the log.txt text file:

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

   * You may want to add the artist in your query as well, to make sure you find the song you are looking for.

   * This utilizes the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window and the log.txt text file:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If you don't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * This uses the `axios` package to retrieve data from the OMDB API.

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * You can edit the text in random.txt to see that it also works for movie-this and concert-this.

Here is a video of the program performing all of its commands: https://www.youtube.com/watch?v=kx_PCBoLP5I