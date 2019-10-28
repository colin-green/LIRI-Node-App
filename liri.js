require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var command = process.argv[2];