import React, { Component } from 'react';
import { withRouter } from 'react-router';
import bluelogo from '../stylesheets/images/bluelogo.svg';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="branding">
                <img className="logo" src={bluelogo} />
                <h1 className="branding">Welcome to AirSpace, {this.props.first_name}</h1>
                <p>Your Teacher ID: {this.props.host_id}</p>
                <a href='#'onClick={this._onStartClick}>Click here to get started!</a>
            </div>
        )
    }

    _onStartClick= (e) => {
        e.preventDefault();
        this.props.history.push(`/Host/About`);
    }
}

export default withRouter(WelcomePage);
