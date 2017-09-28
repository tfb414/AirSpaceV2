import React from 'react'
import { NavLink } from 'react-router-dom'

const HDNavButton = ({ match, name }) => {
    console.log(match)
    return (
        <button>
            <NavLink to={`${match.location.pathname}/${name}`}>{name} </NavLink>
        </button>
    )
}

export default HDNavButton