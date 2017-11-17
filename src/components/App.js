import React, { Component } from 'react';
import Header from './Header';
import {BrowserRouter as Router} from 'react-router-dom';

let defaultArtist = 'Camila Cabello';
let serverUrl = 'http://localhost:8080/';
class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      songs: [],
      loading:false
    }
  }

  componentWillMount() {
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
    let tracksForArtist = this.sendGetRequest(serverUrl, 'tracks/' + artist);
    tracksForArtist.then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
          if(json.length !== 0) {
            this.setState({songs: json},() => {
              console.log(this.state.songs);
              this.setState({
                loading: false,
                error: ''
              })
            })
          } else {
            this.setState({
              error: "No results found"
            })
          }
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

  render() {
    if(this.state.loading) {
      return <h3>Loading....</h3>
    }

    return (
      <Router>
      <Header songs={this.state.songs} artists={this.state.artists} setArtist={this.setArtist} selectedArtist={this.state.artist} error={this.state.error} fetchTracks={this.fetchTracks} defaultArtist={defaultArtist} error={this.state.error}/>
      </Router>
    );
  }
}

export default App;