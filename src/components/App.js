import React, { Component } from 'react';
import Header from './Header';
import {BrowserRouter as Router} from 'react-router-dom';

//lets set one artist to fetch first to avoid delay in loading full data
let defaultArtist = 'Camila Cabello';
let serverUrl = 'http://localhost:8080/';

/**
* Top level Parent component.
*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      songs: [],
      loading:false
    }
  }

  /**
  * Start fetching default artist first before component mounts.
  */
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

  /**
  * Fetches tracks by name of the artist
  */
  fetchTracks = (artist) => {
    let tracksForArtist = this.sendGetRequest(serverUrl, 'tracks/' + artist);
    tracksForArtist.then(response => {
      if (response.ok) {
        response.json().then(json => {
          if(json.length !== 0) {
            this.setState({songs: json},() => {
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

  /**
  * Fetches complete set of artists once one default is loaded.
  */
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

  /**
  * Sends request to beackend by taking url and endpoint as params.
  */
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
      <Header songs={this.state.songs}
              artists={this.state.artists}
              setArtist={this.setArtist}
              selectedArtist={this.state.artist}
              error={this.state.error}
              fetchTracks={this.fetchTracks}
              defaultArtist={defaultArtist}
              error={this.state.error}/>
      </Router>
    );
  }
}

export default App;