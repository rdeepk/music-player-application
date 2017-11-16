import React, {Component} from 'react';

class Artists extends Component {

    handleArtistSelection = (e) => {
        this.props.setArtist(e.target.value);
    }
    render() {
        let selectJSX = this.props.artists.map((artist, i) => {
            return <option value={artist.name} key={i}>{artist.name}</option>
        })
        return (
            <div><select className="artists" value={this.props.selectedArtist} onChange={this.handleArtistSelection}>
            {selectJSX}</select>
            <div className="error">{this.props.error}</div>
            </div>
        )
    }
}

export default Artists;