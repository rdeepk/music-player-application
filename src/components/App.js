import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import SongsList from './SongsList';
import SongDetails from './SongDetails';
import Artists from './Artists';

let defaultArtist = 'Camila Cabello';
let serverUrl = 'http://localhost:8080/';
class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      artist: defaultArtist,
      currentSong: 0,
      songs: [],
      showDetails: false,
      loading:false,
      songDetails: []
    }
  }

  componentWillMount() {
    console.log("will mount");
    this.setState({
      loading: true
    })
    //fetch one artist first to avoid time lag

    let defaultArtistData = this.sendGetRequest(serverUrl, 'default/'+defaultArtist);
    defaultArtistData.then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.state.artists.push(json);
          this.setState(this.state.artists);
        });
      }
    })

    //fetch tracks for default artist
    this.fetchTracks(this.state.artist);
  }

  fetchTracks = (artist) => {
    let tracksForDefaultArtist = this.sendGetRequest(serverUrl, 'tracks/' + artist);
    tracksForDefaultArtist.then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
          this.setState({songs: json},() => {
            this.setState({
              loading: false
            })
          })
        });
      }
    });
  }

  componentDidMount() {
    console.log("did mount");
    //fetch all artists
    let artistsData = this.sendGetRequest(serverUrl, 'artists');
    artistsData.then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.state.artists.pop();
          this.setState({
            artists: json
          });
        });
      }
    })
  }

  sendGetRequest = (url, endPoint) => {
    return fetch(url+endPoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
  }

  setArtist = (name) => {
      this.setState({
        artist: name
      }, () =>{
        this.fetchTracks(this.state.artist);
      })
  }

  setCurrentSong = (index) => {
    console.log(index);
    console.log(this.state.songs.length-1);
    this.setState({
      currentSong: index
  }, () => {
    this.playSong();
    })
  }

  playNext = () => {
    let length = this.state.songs.length;
    if(Number(this.state.currentSong) === Number(length-1)){
      this.setState({
        currentSong: 0
      },() => {
        this.playSong();
      })
    } else {
      this.setState({
        currentSong: Number(this.state.currentSong)+Number(1)
      }, () => {
        this.playSong();
      })
    }
  }

  playSong = () => {
    this.audioPlayer.load()
    this.audioPlayer.play()
  }

  showSongDetails= (index) => {
    this.setState({
      showDetails: true,
      songDetails: this.state.songs[index]
    })
  }

  showSongList = (event) => {
    event.preventDefault();
    this.setState({
      showDetails: false,
      songDetails: []
    })
  }

  render() {
    
   if(this.state.loading) {
     return <h3>Loading....</h3>
   }
    return (
      <div className="app">
        <div className="header">
            <h1>Audio Player</h1>
            { !this.state.showDetails && <Artists artists={this.state.artists} setArtist={this.setArtist} selectedArtist={this.state.artist}/>}
            <div className="row">
              <div className="col-sm-12">
                <audio controls ref={(self) => {this.audioPlayer = self}} onEnded={this.playNext}>
                  <source src={this.state.songs[this.state.currentSong].track}/>
                </audio>
              </div>
            </div>
            </div>
            { !this.state.showDetails && <SongsList songs={this.state.songs} changeSong={this.changeSong} setCurrentSong={this.setCurrentSong} showSongDetails={this.showSongDetails} /> }
            { this.state.showDetails && <SongDetails songDetails={this.state.songDetails} />}
      </div>
    );
  }
}

export default App;