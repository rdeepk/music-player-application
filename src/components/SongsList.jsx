import React, {Component} from 'react';

class SongsList extends Component {

    handleViewSong = (e) => {
        e.preventDefault();
    }

    render() {
        const {songs} = this.props;
        let songsJSX = songs.map((song, i) => {
            return <div className="songlist-item" key={i}>
                        <span>{song.name}<i className="fa fa-play" aria-hidden="true"></i></span>
                        <p><a href="" onClick={(e) => {this.handleViewSong(e)}}>View Song</a></p>
                    </div>
        });

        return (
            <div>
            {songsJSX}
            
            </div>
        )
    }
}

export default SongsList;