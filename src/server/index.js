const express = require('express');
const app = express();
const rp = require('request-promise');

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// function Song(source, title, description, id) {
//   this.source = source;
//   this.title = title;
//   this.description = description;
//   this.id = id;
// }

// const songs = [
//   new Song('/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', 0),
//   new Song('/olympian.mp3', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm', 1),
//   new Song('/transmission.mp3', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', 2)
// ]

artists = ['Post Malone', 
'Camila Cabello',
'Sam Smith',
'Dua Lipa',
// 'Maroon 5',
// 'Selena Gomez',
// 'Ed Sheeran',
// 'ZAYN',
// 'Marshmello',
// 'Lil Pump',
// 'NF',
// 'Logic',
// 'Khalid',
// 'Charlie Puth',
// 'Kygo',
// 'Demi Lovato',
// 'Hailee Steinfeld',
// 'French Montana',
// 'Avicii',
// 'Lil Uzi Vert',
// 'Imagine Dragons',
// 'Macklemore',
// '21 Savage',
// 'Natti Natasha',
// 'Migos',
// 'P!nk',
// 'Charlie Puth',
// 'Justin Bieber'
];


app.get('/users', function (req, res) {
  console.log("here");
  res.json({
    data: "home"
  });
});


app.get('/artists', (req, res) => {
 let resArr = [];
 let completed_requests = 0;
  getSpotifyToken()
              .then((tokenObj) => {
                  
                  artists.forEach((artist, i) => {
                    getTracks(tokenObj, artist).then((tracks) => {
                      let itracks = tracks.tracks.items.filter((track, i)=>{
                        if(track.preview_url) {
                          return true;
                        }
                      })
                      completed_requests++;
                      resArr.push(itracks);
                      if(completed_requests === artists.length) {
                        res.json(resArr);
                      }
                    })
                  })
            })
})


getTracks = ((tokenBody, artist) => {
  var token = tokenBody.access_token;
  var options = {
    //uri: 'https://api.spotify.com/v1/tracks/?ids=2bL2gyO6kBdLkNSkxXNh6x,3twNvmDtFQtAd5gMKedhLD',
    uri: 'https://api.spotify.com/v1/search?q='+artist+'&type=track',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };
  return sendRequest(options);
})

app.get('/callback', (req, res) => {
  console.log(req.query);
})

getSpotifyAuthString = () => {
  return new Buffer('dd0dbf7d895d4c2bb696143f14facc10' + ':' + '2cb236bb3db4456f91d22bf2d90ca034').toString('base64');
  //return new Buffer(clientId + ':' + clientSecret).toString('base64');
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