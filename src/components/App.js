import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SongsList from './SongsList';
import SongDetails from './SongDetails';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            users: json.data
          })
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header><h1>Audio Player</h1></header>
        <Route exact path="/" render={() => <SongsList msg={'this is how we pass props in react router'} />} />
        <Route path='/:songId' render={() => <SongDetails msg={'this is how we pass props in react router'} />} />
        <h1>Users</h1>
        <p>{this.state.users}</p>
      </div>
    );
  }
}

export default App;