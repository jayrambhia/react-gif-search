import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import GifModal from './components/GifModal';
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      term: '',
      selectedGif: null,
      modalIsOpen: false
    };

    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data });
    });

    this.setState({ term:term });
  }

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  render() {
    return (
      <div>
        <SearchBar onTermChange={term => this.handleTermChange(term)} />
        <GifList gifs={this.state.gifs} onGifSelect={selectedGif => this.openModal(selectedGif)} />
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
