import React from 'react';
import './SearchBar.css';
import DialogBox from '../DialogBox/DialogBox';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
            isTerm: false,
            isLocation: false
        };
        this.dialogBoxInfo = {
            class_name: '',
            title: '',
            message: '',
            action: ''
        }
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnterOnTerm = this.handleEnterOnTerm.bind(this);
        this.handleEnterOnLocation = this.handleEnterOnLocation.bind(this);
        this.isTerm = this.isTerm.bind(this);
        this.isLocation = this.isLocation.bind(this);
    }

    getSortByClass(sortByOption){
        return this.state.sortBy === sortByOption ? 'active' : '';

    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map( sortByOption =>  {
            const sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={sortByOptionValue}
                       className={this.getSortByClass(sortByOptionValue)}
                       onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
        });
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value,
            isTerm: this.state.term === '' ? false : true
        });
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value,
            isLocation: this.state.location === '' ? false : true
        });
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    isTerm() {
        return this.state.term ? true : false;
    }

    isLocation() {
        return this.state.location ? true : false;
    }
    // Handles Enter Key press on Term input field
    handleEnterOnTerm(event) {
        if (event.keyCode === 13) {
            if (this.isLocation()) {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            } else {
                alert("Please enter a location.");
                this.dialogBoxInfo.class_name = 'DialogBox-container active';
                this.dialogBoxInfo.title = 'Missing Search Input';
                this.dialogBoxInfo.message = 'Please enter a location.';
                this.dialogBoxInfo.action = 'Got it!';
            }
        }
    }

    // Handles Enter Key press on Location input field
    handleEnterOnLocation(event) {
                console.log('isTerm', this.isTerm());
        if (event.keyCode === 13) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            if (this.isTerm() === false) {
                alert("Please enter a term.");
                this.dialogBoxInfo.class_name = 'DialogBox active';
                this.dialogBoxInfo.title = 'Missing Search Input';
                this.dialogBoxInfo.message = 'Please enter a term.';
                this.dialogBoxInfo.action = 'Got it!';
            }
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Business" onChange={this.handleTermChange} onKeyUp={this.handleEnterOnTerm} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} onKeyUp={this.handleEnterOnLocation} />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
                <DialogBox className={this.dialogBoxInfo.class_name}
                            title={this.dialogBoxInfo.title}
                            message={this.dialogBoxInfo.message}
                            action={this.dialogBoxInfo.action} />
            </div>
        );
    }
};

export default SearchBar;