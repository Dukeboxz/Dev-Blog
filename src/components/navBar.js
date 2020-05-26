import React from 'react'
import {Link} from "gatsby"
import { rhythm} from "../utils/typography"

const NavBar = () => {

    return (
        <div className="topNav">
            <Link to="/">Blog</Link>
            <Link to="/aboutMe/">About Me</Link>
        </div>
    )
}

export default NavBar