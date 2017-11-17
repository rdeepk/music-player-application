import React, {Component} from 'react';
import { Link } from 'react-router-dom';

/**
* This component display the details view of the song.
*/
class SongDetails extends Component {

    /**
    * callback handler for the play link.
    */
    handlePlaySong = (e) => {
        e.preventDefault();
        this.props.setCurrentSong(Number(this.props.match.params.songId));
    }

    render() {
         let songDetails = this.props.songs[Number(this.props.match.params.songId)];
         let artistsJSX = songDetails.artists.map((artist, i) => {
            return <span key ={i}>{artist.name}</span>     
         })

         if(this.props.tracksLoading) {
            return <h3>Loading....</h3>
          }

        return (
            <div>
                <div className="track">
                        <div className="track-img">
                            <img src={songDetails.images[0].url} alt="album" />
                        </div>
                        <div className="track-details">
                            <h2>{songDetails.name}</h2>
                            <a href="" onClick={(e) => {this.handlePlaySong(e)}}>
                                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                            </a>
                            <p>Album: {songDetails.album}</p>
                            <p>Popularity: {songDetails.popularity}</p>
                            <p>Artists: {artistsJSX}</p>
                            <p>Duration: {songDetails.duration}</p>
                            <p>Track Number: {songDetails.track_number}</p>
                            <a className="btn" href={songDetails.spotifyUrl} target="_blank">Listen Full Song on Spotify</a>
                            <Link className="btn" to="/">Go Back</Link>
                        </div>
                   
                </div>
            </div>
        )
    }
}

export default SongDetails;