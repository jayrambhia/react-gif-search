import React from 'react';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import '../styles/app.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Favorites extends React.Component {

  componentDidMount() {
    this.props.actions.fetchFavoriteGifs();
  }

  render() {

    // Firebase.auth() is async now so if we refresh, fetchFavoriteGifs() will fail.
    // render() will be called again when Actions.verifyAuth is dispatched and
    // authenticated state is changed to true and then we shall call this method again.

    // Probably there's a better way.

    if (this.props.gifs.length == 0 && this.props.authenticated) {
      this.props.actions.fetchFavoriteGifs();
    }

    return (
      <div>
        <GifList gifs={this.props.gifs}
                 onGifSelect={ selectedGif => this.props.actions.openModal(selectedGif) }
                 onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif(selectedGif) }
                 onFavoriteDeselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
                 isAuthenticated= { this.props.authenticated }
                 isFavorite= { true }
                 />
        <GifModal modalIsOpen={this.props.modalIsOpen}
                  selectedGif={this.props.selectedGif}
                  onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favorites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
