import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: '' }
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Find your gifs here!" onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

export default SearchBar;