const express = require('express');
const Genius = require("genius-lyrics");
const config = require('./config.json');
const Client = new Genius.Client(config.api_key);
var app = express();
app.use(express.json());

async function getLyrics(song) {
    const searches = await Client.songs.search(song);
    const firstSong = searches[0];
    const lyrics = await firstSong.lyrics();
    let final = lyrics.replace(/ *\[[^\]]*\] */g, '');
    return final;
};

app.get("/song", async function(req, res) {
    const song = req.query.song;
    getLyrics(song).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
    });
});
  
app.listen(6969,() => {
    console.log("Server is running on port 6969");
  });
  