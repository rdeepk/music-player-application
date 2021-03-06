import React, {Component} from 'react';

/**
* This is component populates the artists dropdown and trigger the onChange event.
*/
class Artists extends Component {

    handleArtistSelection = (e) => {
        this.props.setArtist(e.target.value);
    }
    render() {
        const { error } = this.props;
        let selectJSX = this.props.artists.map((artist, i) => {
            return <option value={artist.name} key={i}>{artist.name}</option>
        })

        let errorStyle = error === '' ? { display: "none" } : { display: "block" };
        
        return (
            <div><select className="artists" value={this.props.selectedArtist} onChange={this.handleArtistSelection}>
            {selectJSX}</select>
            <div className="error" style={errorStyle}>{error}</div>
            </div>
        )
    }
}

export default Artists;