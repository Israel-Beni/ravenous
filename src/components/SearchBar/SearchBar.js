import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
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

    }

    handleLocationChange(event) {

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
                    <input placeholder="Search Business" />
                    <input placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
};

export default SearchBar;