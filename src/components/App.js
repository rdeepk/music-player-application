import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Header from './Header';

let defaultArtist = 'Camila Cabello';
let serverUrl = 'http://localhost:8080/';
class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: []
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

  render() {
    return (
      <div className="App">
        <Header artists={this.state.artists} defaultArtist={defaultArtist}/>
      </div>
    );
  }
}

export default App;