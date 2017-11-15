import React, {Component} from 'react';
import SongsList from './SongsList';
import SongDetails from './SongDetails';
import Artists from './Artists';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            // currentSong: 0,
            songs: [],
            list:true,
            details: false
        }
    }

    // handleArtist = (event) => {
    //     event.preventDefault();
    //     this.getArtistTracks()
    
    // }

    getArtistTracks = (url) => {

    }

    componentDidMount() {
        fetch('http://localhost:8080/tracks/'+ this.props.defaultArtist, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
          ).then(response => {
            if (response.ok) {
              response.json().then(json => {
                console.log(json);
                this.setState({songs: json})
              });
            }
          });
    }

    changeSongs = (index) => {
        this.setState({
            currentSong: index
        }, () => {
            this.audioPlayer.load()
            this.audioPlayer.play()
        })
    }

    setArtist = (name) => {
        
    }

    render() {
        // const {artists} = this.props;
        //     console.log(artists);
        //     let artistsJSX = artists.map((artist, i)=>{
        //         return <li key={i}><a href="" id={artist.id} onClick={(e)=>{this.handleArtist(e)}}>{artist.name}</a></li>
        //     });
       

        return (
            <div>
            <h1>Audio Player</h1>
            <Artists artists={this.props.artists} setArtist={this.setArtist} defaultArtist={this.props.defaultArtist}/>
            <audio controls ref={(self) => {this.audioPlayer = self}}>
                {/* <source src={this.props.songs[this.state.currentSong].source} /> */}
                <source src="https://p.scdn.co/mp3-preview/50b0e32ba40bb79e039c1fc6b8a7a6d4ef554886?cid=dd0dbf7d895d4c2bb696143f14facc10" />
            </audio>
            {/* <button type="button" onClick={() => {this.changeSongs(2)}}>Change Song</button> */}
            {/* <div>{artistsJSX}</div> */}
            { this.state.list && <SongsList songs={this.state.songs} /> }
            { this.state.details && <SongDetails />}
            </div>
        )
    }
}

export default Header;