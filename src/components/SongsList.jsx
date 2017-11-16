import React, {Component} from 'react';

class SongsList extends Component {

    handleViewSong = (e) => {
        e.preventDefault();
        this.props.showSongDetails(e.target.id);
    }

    playSong = (event) => {
        event.preventDefault();
        this.props.setCurrentSong(event.target.id);
    }

    render() {
        const {songs} = this.props;
        let songsJSX = songs.map((song, i) => {
            return  <div className="song">
                        {/* <div className="row" key={i}> */}
                            <div className="song-number">
                                {i+1}
                            </div>
                            <div className="song-title">
                                {song.name}
                            </div>
                            <div className="song-view">
                                <a href="" id={i} onClick={(e) => {this.handleViewSong(e)}}>More Info</a>
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