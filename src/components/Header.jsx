import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import SongsList from './SongsList';
import SongDetails from './SongDetails';
import Artists from './Artists';

/**
* This is child component to App and controls the Songslist and songdetails display.
*/
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
            artist: this.props.defaultArtist,
            error : ''
        }
    }

    /**
    * Passed as a prop to Artist for callback onChange event of artist dropdown
    */
    setArtist = (name) => {
        this.setState({
          artist: name
        }, () =>{
            this.props.fetchTracks(this.state.artist);
            this.setState({
            currentSong: 0
            })
          });
    }
    
    /**
    * Passed as a prop to Songlist and SongDetails for callback on click of play button of song.
    * It controls the state of current song by tracking the index of the array currently playing song.
    */
    setCurrentSong = (index) => {
      this.setState({
        currentSong: index
    }, () => {
      this.playSong();
      })
    }
    
    /**
    * Callback onEnded event of the audio tag. increments the index of currently playing song when it finishes.
    * It loads and plays the next song.
    */
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
    
    /**
    * Loads and plays the currentSong
    */
    playSong = () => {
      this.audioPlayer.load()
      this.audioPlayer.play()
    }


    render() {
        const { songs, artists } = this.props;
        let artistsJSX = songs[this.state.currentSong].artists.map((artist, i) => {
            return i > 0? <span key = {i}>, {artist.name}</span> : <span key = {i}>{artist.name}</span>      
         })

        return (
            <div className="app">
                <div className="header">
                    <h1>Audio Player</h1>
                    <Artists artists={artists} setArtist={this.setArtist} selectedArtist={this.state.artist} error={this.props.error}/>
                    <div className="row">
                    <div className="col-sm-12">
                        <audio controls ref={(self) => {this.audioPlayer = self}} onEnded={this.playNext} autoPlay>
                        <source src={songs[this.state.currentSong].track}/>
                        </audio>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-3"><img src={songs[this.state.currentSong].images[2].url} alt="album" /></div>
                    <div className="col-sm-9">{songs[this.state.currentSong].name} By: {artistsJSX}</div>
                    </div> 
                    </div>
                    <Route exact path="/" render={(props) => (
                                                            <SongsList songs={songs}
                                                                    changeSong={this.changeSong}
                                                                    setCurrentSong={this.setCurrentSong}
                                                        />
                        )} />
                    <Route path="/:songId" render={(props) => 
                                                                    <SongDetails  songs={songs}
                                                                                showSongList={this.showSongList}
                                                                                setCurrentSong={this.setCurrentSong} {...props}
                                                                    />
                        } />
            </div>
        )
    }
}

export default Header;