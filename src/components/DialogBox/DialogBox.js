import React from 'react';
import './DialogBox.css';

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class_name: 'active'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.changeVisibility();
        console.log('this.state.isVisible', this.state.isVisible);
        event.preventDefault();
    }

    render() {
        return (
            <div className={`DialogBox-container ${this.props.visibilityState.className}-DialogBox`}>
                <div className="DialogBox">
                    <div className="DialogBox-subcontainer">
                        <h3 className="title">{this.props.title}</h3>
                        <p className="message">{this.props.message}</p>
                        <div className="action" onClick={this.handleClick}>
                            <a>{this.props.action}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DialogBox;