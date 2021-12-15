import React from 'react';
import logo from '../../logo.svg';
import './app.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      searchInfo: {}
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    console.log('term:', term)
    console.log('location', location)
    console.log('sortBy', sortBy)
    Yelp.search(term, location, sortBy)
              .then(businesses => {
                this.setState({
                  businesses: businesses,
                  searchInfo: {
                    term: term,
                    location: location,
                    sortBy: sortBy
                  }
                })
              });
    console.log('businesses:', this.state.businesses)
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} searchInfo={this.state.searchInfo}/>
      </div>
    );
  }
}

export default App;
