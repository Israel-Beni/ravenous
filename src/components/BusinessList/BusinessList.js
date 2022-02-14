import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';
import DialogBox from '../DialogBox/DialogBox';

class BusinessList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            className: 'inactive'
        }
        this.counter = 0;
        this.className = 'active    ';
        this.updateCounter = this.updateCounter.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.toggleDialogBoxState = this.toggleDialogBoxState.bind(this);
        this.getVisibilityState = this.getVisibilityState.bind(this);
        this.changeClassName = this.changeClassName.bind(this);
        this.changeTwiceClassName = this.changeTwiceClassName.bind(this);
    }
    

    updateCounter() {
        this.counter++;
    }

    changeVisibility() {
        this.updateCounter();
        console.log('this.state.counter', this.counter);
        if (this.counter === 1) {
            //console.log('inactive');
            //this.className = 'inactive';
            return 'inactive';
        } else {
            //this.toggleDialogBoxState();
            //this.className = this.getVisibilityState().className;
            return 'active';
        }
        //console.log('BusinessList this.className', this.className);
    }

    toggleDialogBoxState() {
        this.setState({
            isVisible: !this.state.isVisible,
            className: this.state.className === 'active' ? 'inactive' : 'active'
        })
        console.log('this.state.className');
        this.props.toggleDialogBoxState();
    }

    getVisibilityState() {
        return this.props.getDialogBoxVisibilityState();
    }

    changeClassName() {
        this.updateCounter();
        console.log('this.state.counter', this.counter);
        if (this.counter === 1) {
            this.className = 'inactive';
        } else {
            this.className = this.state.className === 'active'? 'inactive' : 'active';
        }
        console.log('in changeClassName(): this.className', this.className);
        return this.className;
    }

    changeTwiceClassName() {
        if (this.counter === 3) {
            this.setState({
                isVisible: true,
                className: 'active'
            });
        } else if (this.counter > 3) {
            this.setState({
                isVisible: !this.state.isVisible,
                className: this.className === 'active'? 'inactive' : 'active'
            });
        }
        console.log('in changeTwiceClassName(): this.className', this.state.className);
        return {
            isVisible: this.state.isVisible,
            className: this.state.className
        }
    }

    render() {
        return (
            <div className="BusinessList">
                {   this.props.businesses.length !== 0 ? this.props.businesses.map(business => <Business key={business.id} business={business} />) : 
                                    <p className={`no-result ${this.changeVisibility()}`}>No result found for {this.props.searchInfo.term} in/at {this.props.searchInfo.location}</p>
/*
                                    <div className={`no-result ${this.changeClassName()}`}>
                                        <DialogBox title="Oops! Sorry!"
                                                    message={`No result found for ${this.props.searchInfo.term} in/at ${this.props.searchInfo.location}`}
                                                    action="Got it!"
                                                    //changeVisibility={() => {}}
                                                    //visibilityState={ {className: 'active' }}
                                                    changeVisibility={this.changeTwiceClassName}
                                                    visibilityState={this.changeTwiceClassName()}
                                                    />*/
                }
            </div>
        );
    }
};

export default BusinessList;