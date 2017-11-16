import React, {Component} from 'react';

class SongDetails extends Component {

    showSongList = (event) => {
        event.preventDefault();
        this.props.showSongList();
    }

    handlePlaySong = (e) => {
        e.preventDefault();
        this.props.setCurrentSong(this.props.currentSongIndex);
    }

    render() {
         //console.log(this.props.match.params)
         console.log(this.props.songDetails);
         const {songDetails} = this.props;
         let artistsJSX = songDetails.artists.map((artist, i) => {
            return <span>{artist.name}</span>
            {/* <p>{artist.external_urls.spotify}</p> */}        
         })
        return (
            <div>
                <div className="track">
                        <div className="track-img">
                            <img src={songDetails.images[0].url} />
                        </div>
                        <div className="track-details">
                            <h2>{songDetails.name}</h2>
                            <a href="" onClick={(e) => {this.handlePlaySong(e)}}>
                                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                            </a>
                            <p>Album: {songDetails.album}</p>
                            <p>Popularity: {songDetails.popularity}</p>
                            {/* <p>{songDetails.spotifyUrl}</p> */}
                            <p>Artists: {artistsJSX}</p>
                            <p>Duration: {songDetails.duration}</p>
                            <p>Track Number: {songDetails.track_number}</p>
                            <a href={songDetails.spotifyUrl} target="_blank">Listen Full Song on Spotify</a>
                        </div>
                   
                </div>
                <a href="" onClick={(e) => {this.showSongList(e)}}>Back</a>
            </div>
        )
    }
}

export default SongDetails;