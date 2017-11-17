import React, {Component} from 'react';
import { Link } from 'react-router-dom';

/**
* This component displays the songs list view by the selected artist.
*/
class SongsList extends Component {

    /**
    *  callback handler on the click of play button.
    */
    playSong = (event) => {
        event.preventDefault();
        this.props.setCurrentSong(event.target.id);
    }

    render() {
        const {songs} = this.props;
        let songsJSX = songs.map((song, i) => {
            return  <div className="song" key = {i}>
                        {/* <div className="row" key={i}> */}
                            <div className="song-number">
                                {i+1}
                            </div>
                            <div className="song-title">
                                {song.name}
                            </div>
                            <div className="song-view">
                            <Link to={"/"+ i} onClick={this.props.toggeleDetailsView}>More Info</Link>
                            </div>
                            <div className="song-play">
                                <a href="" onClick={(e) => {this.playSong(e)}}>
                                    <i id={i} className="fa fa-play-circle-o" aria-hidden="true"></i>
                                </a>
                            </div>
                        {/* </div> */}
                    </div>
        });

        return (
            <div className="songs">{songsJSX}</div>
        )
    }
}

export default SongsList;