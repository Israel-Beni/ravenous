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
      searchInfo: {},
      dialogBoxInfo: {},
      isDialogBoxVisible: false,
      dialogBoxClass: 'inactive'
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.toggleDialogBoxState = this.toggleDialogBoxState.bind(this);
    this.getDialogBoxVisibilityState = this.getDialogBoxVisibilityState.bind(this);
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

  toggleDialogBoxState() {
    this.setState({
        isDialogBoxVisible: !this.state.isDialogBoxVisible,
        dialogBoxClass: this.state.dialogBoxClass === 'inactive' ? 'active' : 'inactive'
    });
    console.log('1');
    console.log('isVisible', this.state.isDialogBoxVisible);
    console.log('className', this.state.dialogBoxClass);
  }

  getDialogBoxVisibilityState() {
    console.log('2');
    console.log('isVisible', this.state.isDialogBoxVisible);
    console.log('className', this.state.dialogBoxClass);
    return {
        className: this.state.dialogBoxClass,
        isVisible: this.state.isDialogBoxVisible
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} toggleDialogBoxState={this.toggleDialogBoxState} getDialogBoxVisibilityState={this.getDialogBoxVisibilityState} />
        <BusinessList businesses={this.state.businesses} searchInfo={this.state.searchInfo} toggleDialogBoxState={this.toggleDialogBoxState} getDialogBoxVisibilityState={this.getDialogBoxVisibilityState} />
      </div>
    );
  }
}

export default App;
