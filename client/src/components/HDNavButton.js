import React from 'react'
import { NavLink } from 'react-router-dom'

const HDNavButton = ({ match, name }) => {

    return (
        <button className="HDNavButton">
            <NavLink to={`/Host/${name}`}>{name}</NavLink>
        </button>
    )
}

export default HDNavButton