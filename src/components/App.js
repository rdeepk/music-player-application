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
      // currentSong: 0,
      songs: [],
      list:true,
    }
  }

  componentWillMount() {

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
          this.setState({songs: json})
        });
      }
    });
  }

  componentDidMount() {
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

  hangeSongs = (index) => {
    this.setState({
        currentSong: index
    }, () => {
        this.audioPlayer.load()
        this.audioPlayer.play()
    })
}

setArtist = (name) => {
    this.setState({
      artist: name
    }, () =>{
      this.fetchTracks(this.state.artist);
    })
}

  render() {
    return (
      <div className="App">
            <h1>Audio Player</h1>
            <Artists artists={this.state.artists} setArtist={this.setArtist} selectedArtist={this.state.artist}/>
            <audio controls ref={(self) => {this.audioPlayer = self}}>
                {/* <source src={this.props.songs[this.state.currentSong].source} /> */}
                <source src="https://p.scdn.co/mp3-preview/50b0e32ba40bb79e039c1fc6b8a7a6d4ef554886?cid=dd0dbf7d895d4c2bb696143f14facc10" />
            </audio>
            {/* <button type="button" onClick={() => {this.changeSongs(2)}}>Change Song</button> */}
            {/* <div>{artistsJSX}</div> */}
            { this.state.list && <SongsList songs={this.state.songs} /> }
            { this.state.details && <SongDetails />}
      </div>
    );
  }
}

export default App;