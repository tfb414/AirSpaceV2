import React from 'react';
import { NavLink } from 'react-router-dom';


const HDNavButton = ({ match, name, onClick }) => {

    return (
        <NavLink to={`/Host/${name}`}>
            <button className="HDNavButton">
                {name}
            </button>
        </NavLink>
    )
}

export default HDNavButton