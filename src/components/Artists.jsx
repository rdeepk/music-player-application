import React, {Component} from 'react';

class Artists extends Component {

    handleArtistSelection = (e) => {
        this.props.setArtist(e.target.name);
    }
    render() {
        let selectJSX = this.props.artists.map((artist, i) => {
            return <option value={artist.name} key={i}>{artist.name}</option>
        })
        return (
            <div><select className="artists" value={this.props.defaultArtist} onChange={this.handleArtistSelection}>
            {selectJSX}
        </select>
            </div>
        )
    }
}

export default Artists;