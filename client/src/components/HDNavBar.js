import React from 'react'
import { NavLink } from 'react-router-dom'

import HDNavButton from './HDNavButton'

const HDNavBar = (props) => {
    let navBar = props.name.map((link) => {
        return <HDNavButton match={props.match} name={link} />
    })
    return (
        <div>
            {navBar}
        </div>

    )
}

export default HDNavBar