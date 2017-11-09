const express = require('express');
const app = express();
const rp = require('request-promise');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function Song(source, title, description, id) {
  this.source = source;
  this.title = title;
  this.description = description;
  this.id = id;
}

const songs = [
  new Song('/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', 0),
  new Song('/olympian.mp3', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm', 1),
  new Song('/transmission.mp3', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', 2)
]


app.get('/users', function (req, res) {
  console.log("here");
  res.json({
    data: "home"
  });
});

app.get('/tracks', (req, res) => {
  //uri: 'https://api.spotify.com/v1/tracks/?ids=3n3Ppam7vgaVa1iaRUc9Lp,3twNvmDtFQtAd5gMKedhLD',
  getSpotifyToken()
    .then((json) => {
      console.log(json);
      res.json(json);
    })

})

app.get('/callback', (req, res) => {
  console.log(req.query);
})

getSpotifyAuthString = () => {
  
  return new Buffer(clientId + ':' + clientSecret).toString('base64');
}

getSpotifyToken = () => {
  var options = {
    method: 'POST',
    form: {
      grant_type: 'client_credentials'
    },
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + getSpotifyAuthString()
    },
    json: true
  };

  return sendRequest(options);
}

sendRequest = (options) => {
  return rp(options)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}


// start Express on port
app.listen(8080, () => {
  console.log('Server Started on http://localhost:8080');
  console.log('Press CTRL + C to stop server');
});