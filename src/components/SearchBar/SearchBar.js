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
            isLocation: false,
            dialogBoxInfo: {},
            isDialogBoxVisible: false,
            dialogBoxClass: 'inactive'
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.counter = 0;
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnterOnTerm = this.handleEnterOnTerm.bind(this);
        this.handleEnterOnLocation = this.handleEnterOnLocation.bind(this);
        this.isTerm = this.isTerm.bind(this);
        this.isLocation = this.isLocation.bind(this);
        this.setDialogBox = this.setDialogBox.bind(this);
        this.toggleDialogBoxState = this.toggleDialogBoxState.bind(this);
        this.getVisibilityState = this.getVisibilityState.bind(this);
        //this.checkVisibility = this.checkVisibility.bind(this);
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
        if (this.isTerm() === false) {
            this.setDialogBox('Missing Search Input', 'Please enter a term.', 'Got it!');
            this.toggleDialogBoxState();
        } else if (this.isLocation() === false){
            this.setDialogBox('Missing Search Input', 'Please enter a location.', 'Got it!');
            this.toggleDialogBoxState();
        } else {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault();
        }
    }

    isTerm() {
        return this.state.term ? true : false;
    }

    isLocation() {
        return this.state.location ? true : false;
    }

    setDialogBox(title, message, action) {
        this.setState({
            dialogBoxInfo: {
                title: title,
                message: message,
                action: action
            }
        });
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

    getVisibilityState() {
        console.log('2');
        console.log('isVisible', this.state.isDialogBoxVisible);
        console.log('className', this.state.dialogBoxClass);
        return {
            className: this.state.dialogBoxClass,
            isVisible: this.state.isDialogBoxVisible
        }
    }

    // Handles Enter Key press on Term input field
    handleEnterOnTerm(event) {
        if (event.keyCode === 13) {
            if (this.isLocation()) {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            } else {
                // alert("Please enter a location.");
                this.setDialogBox('Missing Search Input', 'Please enter a location.', 'Got it!');
                this.toggleDialogBoxState();
            }
        }
    }

    // Handles Enter Key press on Location input field
    handleEnterOnLocation(event) {
        if (event.keyCode === 13) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            if (this.isTerm() === false) {
                // alert("Please enter a term.");
                this.setDialogBox('Missing Search Input', 'Please enter a term.', 'Got it!');
                this.toggleDialogBoxState();
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
                <DialogBox title={this.state.dialogBoxInfo.title}
                            message={this.state.dialogBoxInfo.message}
                            action={this.state.dialogBoxInfo.action}
                            changeVisibility={this.toggleDialogBoxState}
                            visibilityState={this.getVisibilityState()}
                            />
            </div>
        );
    }
};

export default SearchBar;