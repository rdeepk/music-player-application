const express = require('express');
const app = express();
const rp = require('request-promise');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let token

let artists = ['Post Malone', 
'Camila Cabello',
'Dua Lipa',
'Maroon 5',
'Selena Gomez',
'Ed Sheeran',
'ZAYN',
'Marshmello',
'Lil Pump',
'NF',
'Logic',
'Khalid',
'Charlie Puth',
'Kygo',
'Demi Lovato',
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

let spotifyData = [];

app.get('/default/:artistName', (req, res) => {
  token = getSpotifyToken();
  artistName = req.params.artistName;
  token.then((tokenObj) => {
                  getSpotifyData(tokenObj, artistName, 'artist').then((data) => {
                    let artistData = {
                      "name": data.artists.items[0].name,
                      "id": data.artists.items[0].id,
                      "apiUrl": data.artists.items[0].href,
                      "images": data.artists.items[0].images
                    }
                    res.json(artistData)
                  });
                });
})

app.get('/artists', (req, res) => {
 let spotifyArtists = [];
 let completed_requests = 0;

  if(!token) {
    token = getSpotifyToken();
  }
  
  token.then((tokenObj) => {
                  
                  artists.forEach((artist, i) => {                  
                   
                    getSpotifyData(tokenObj, artist, 'artist').then((tracks) => {
                      let artistData = {
                        "name": tracks.artists.items[0].name,
                        "id": tracks.artists.items[0].id,
                        "apiUrl": tracks.artists.items[0].href,
                        "images": tracks.artists.items[0].images
                      }
                      spotifyArtists.push(artistData);
                       completed_requests++;
                      if(completed_requests === artists.length) {
                        console.log(spotifyArtists);
                        res.json(spotifyArtists);
                      }
                    })
                  })
            })
})

app.get('/tracks/:artistName', (req, res) => {

  if(!token) {
    token = getSpotifyToken();
  }
  let artistName = req.params.artistName;
  token.then((tokenObj) => {
                  getSpotifyData(tokenObj, artistName, 'track').then((data) => {
                    let songs = [];
                    let itracks = data.tracks.items.filter((track, i)=>{
                      if(track.preview_url !== null) {
                        let artistTracks = {
                          id:track.id,
                          images: track.album.images,
                          track_number: track.track_number,
                          album:  track.album.name,
                          track: track.preview_url,
                          spotifyUrl: track.external_urls.spotify,
                          name: track.name,
                          popularity: track.popularity,
                          duration: track.duration_ms,
                          artists: track.artists
                        }
                        songs.push(artistTracks);
                        spotifyData.push({artistName: artistTracks})
                        return true;
                      }
                    })
                    //console.log(songs);
                    res.json(songs);
                  });
                });
})



getSpotifyData = ((tokenBody, artist, type) => {
  var token = tokenBody.access_token;
  var options = {
    //uri: 'https://api.spotify.com/v1/tracks/?ids=2bL2gyO6kBdLkNSkxXNh6x,3twNvmDtFQtAd5gMKedhLD',
    uri: 'https://api.spotify.com/v1/search?q='+artist+'&type='+type,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };
  return sendRequest(options);
})

// app.get('/callback', (req, res) => {
//   console.log(req.query);
// })

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