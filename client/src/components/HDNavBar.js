import React from 'react'
import { NavLink } from 'react-router-dom'

import HDNavButton from './HDNavButton'

const HDNavBar = (props) => {
    let navBar = props.name.map((link) => {
        return <HDNavButton className={props.className} match={props.match} name={link} />
    })
    return (
        <div className={props.className}>
            {navBar}
        </div>

    )
}

export default HDNavBar