import React, { Component } from 'react';
import { withRouter } from 'react-router';

class HostAbout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>AirSpace is a group response platform that allows students or other members of a group to provide feedback and answer a teacher's or host's questions.<br /><br />
                Group members can initiate or join existing sessions via phone, tablet, or computer by entering their teacher's email.
                The teacher can then send surveys and view member responses in real time.</p>
                <p>As a host, start by creating a survey or quiz on the <a href='#' onClick={this._redirectCreate}>Create</a> page.</p>
            </div>
        )
    }

    _redirectCreate = (e) => {
        e.preventDefault();

    }
}

export default HostAbout;