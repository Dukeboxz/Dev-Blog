import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { rhythm, scale } from "../utils/typography"
import Bio from "./bio"
import NavBar from "./navBar"
import Taglist from "./tagList"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  const banner = useStaticQuery(graphql`
  {
    file(relativePath: {eq: "Banner2.png"}) {
      childImageSharp {
       fluid{
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `)

  if (location.pathname === rootPath) {
    header = (
      <div
        style={{
          
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          <Img fluid={banner.file.childImageSharp.fluid}
          alt="Banner Stephen Jackson is Dev Come Later"
          />
        </Link>
    </div>
    
      
    )
  } else {
    header = (
      <div  style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}>
       
      
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
       </div>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(48),
        padding: `${rhythm(1.5)} ${rhythm(2 / 4)}`,
      }}
    >
      <header>{header}</header>
      <Bio />
      <NavBar/>
      
      <main>{children}</main>
      <Taglist/>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
