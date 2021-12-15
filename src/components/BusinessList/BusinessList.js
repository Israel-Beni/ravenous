import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            counter: 0
        }*/
        this.counter = 0;
        this.updateCounter = this.updateCounter.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    updateCounter() {
        this.counter++;
    }

    changeVisibility() {
        this.updateCounter();
        console.log('this.state.counter', this.counter);
        if (this.counter === 1) {
            console.log('inactive');
            return 'inactive';
        } else {
            console.log('active');
            return 'active';
        }
    }

    render() {
        return (
            <div className="BusinessList">
                {this.props.businesses.length !== 0 ? this.props.businesses.map(business => <Business key={business.id} business={business} />) :
                                    <p className={`no-result ${this.changeVisibility()}`}  >No result found for {this.props.searchInfo.term} in/at {this.props.searchInfo.location}</p>}
            </div>
        );
    }
};

export default BusinessList;