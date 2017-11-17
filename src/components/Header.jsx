import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import SongsList from './SongsList';
import SongDetails from './SongDetails';
import Artists from './Artists';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
            artist: this.props.defaultArtist,
            currentSong: 0,
            error : ''
        }
    }

    setArtist = (name) => {
        this.setState({
          artist: name
        }, () =>{
          this.props.fetchTracks(this.state.artist, () => {
              this.setState({
                currentSong: 0
              })
          });
        })
    }
  
    setCurrentSong = (index) => {
      console.log(index);
      this.setState({
        currentSong: index
    }, () => {
      console.log(this.state.currentSong)
      this.playSong();
      })
    }
  
    playNext = () => {
      let length = this.props.songs.length;
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


    render() {
        let artistsJSX = this.props.songs[this.state.currentSong].artists.map((artist, i) => {
            return i > 0?<span>, {artist.name}</span> : <span>{artist.name}</span>      
         })

        return (
            <div className="app">
                <div className="header">
                    <h1>Audio Player</h1>
                    { !this.state.showDetails && <Artists artists={this.props.artists} setArtist={this.setArtist} selectedArtist={this.state.artist} error={this.props.error}/>}
                    <div className="row">
                    <div className="col-sm-12">
                        <audio controls ref={(self) => {this.audioPlayer = self}} onEnded={this.playNext} autoPlay>
                        <source src={this.props.songs[this.state.currentSong].track}/>
                        </audio>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-3"><img src={this.props.songs[this.state.currentSong].images[2].url} /></div>
                    <div className="col-sm-9">{this.props.songs[this.state.currentSong].name} By: {artistsJSX}</div>
                    </div> 
                    </div>
                    <Route exact path="/" render={(props) => (
                                                            <SongsList songs={this.props.songs}
                                                                    changeSong={this.changeSong}
                                                                    setCurrentSong={this.setCurrentSong}
                                                        />
                        )} />
                    <Route path="/:songId" render={(props) => 
                                                                    <SongDetails  songs={this.props.songs}
                                                                                showSongList={this.showSongList}
                                                                                setCurrentSong={this.setCurrentSong} {...props}
                                                                    />
                        } />
            </div>
        )
    }
}

export default Header;