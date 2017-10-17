import React from 'react';
import { NavLink } from 'react-router-dom';
import HDNavButton from './HDNavButton';
import { withRouter } from 'react-router';



const HDNavBar = (props) => {
    let navBar = props.name.map((link) => {
        return <HDNavButton className="HdNavBar" match={props.match} name={link} />
    })
    return (
        <div>
            <div className="leftHeader">
                <p className="headerBranding">AirSpace</p>
                <p>{props.first_name} {props.last_name}</p>
                <div className="teacherID">
                    <p>TeacherID:</p>
                    <p>{props.hostid}</p>
                </div>    
            </div>
            <div className={props.className} >
                {navBar}
            </div>
        </div>    

    )
    
}

export default withRouter(HDNavBar)