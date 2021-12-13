import React from 'react';
import './DialogBox.css';

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class_name: this.props.class_name
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    changeVisibility() {
        this.state.class_name === 'DialogBox active' ? this.setState({
            class_name: 'DialogBox'
        }) : this.setState({
            class_name: 'DialogBox active'
        });
    }

    handleClick(event) {
        this.changeVisibility();
        event.preventDefault();
    }

    render() {
        return (
            <div className="DialogBox">
                <div className={this.props.class_name}>
                    <h3 className="title">{this.props.title}</h3>
                    <p className="message">{this.props.message}</p>
                    <div className="action">
                        <a onClick={this.handleClick}>{this.props.action}</a>
                    </div>
                </div>
            </div>
        );
    }
};

export default DialogBox;