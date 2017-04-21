import React from 'react';
import Rx from 'rxjs/Rx';

class SearchBar extends React.Component {

  componentDidMount() {
    this.subject = new Rx.Subject();
    this.subject.debounceTime(800)
                .filter(term => term.trim().length > 0)
                .subscribe(term => this.onTermChange(term.trim()));
  }

  onTermChange(term) {
    this.props.onTermChange(term);
  }

  onInputChange(term) {
    this.subject.next(term);
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Find your gifs here!" onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  componentWillUnmount() {
    if (this.subject !== undefined) {
      this.subject.complete();
    }
  }
}

export default SearchBar;
