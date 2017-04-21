import React from 'react';

class GifItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorite: this.props.isFavorite };
  }

  favoriteGif() {
    this.setState({ favorite: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorite: false })
    this.props.onFavoriteDeselect(this.props.gif);
  }

  renderFavoriteHeart = () => {
    if (!this.props.isAuthenticated) {
      return '';
    }

    if (this.state.favorite) {
      return <i className="favorite fa fa-heart" onClick={() => this.unfavoriteGif()} />
    }

    return <i className="favorite fa fa-heart-o" onClick={() => this.favoriteGif()} />
  };

  render() {
    return (
      <div className="gif-item">
        { this.renderFavoriteHeart() }
        <img src={this.props.gif.images.downsized.url} onClick={() => this.props.onGifSelect(this.props.gif)} />
      </div>
    );
  }
}

export default GifItem;
