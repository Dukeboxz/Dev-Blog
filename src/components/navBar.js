import React from 'react'
import {Link} from "gatsby"
import styles from "../styles/navbarStyle.module.css"


const NavBar = () => {

        console.log(styles)
        let barLinks = (
        <div>
        <ul className={styles.NavList}>
                <li className={styles.NavLink}> <Link to="/">Blog</Link></li>
                <li className={styles.NavLink}> <Link to="/aboutMe/">About Me</Link></li>
            </ul>
            </div>
        )
    

    return (
        <div className="topNav">
            
            {barLinks}
           
           
        </div>
    )
}

export default NavBar