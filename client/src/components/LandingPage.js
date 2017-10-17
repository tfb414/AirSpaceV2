import React, { Component } from 'react';
import LandingButtonContainer from './LandingButtonContainer';
import logo from '../stylesheets/images/mix.svg';
import { withRouter } from 'react-router';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="landingPage">
                <a href="#" onClick={this._aboutRedirect}>About</a>
                <div className="branding">
                    <img className="logo" src={logo} />
                    <h1 className="branding">AirSpace</h1>
                </div>
                <LandingButtonContainer />
            </div>
        );
    }

    _aboutRedirect = (e) => {
        e.preventDefault();
        this.props.history.push('/About/');
    }
}
export default withRouter(LandingPage);