import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NavBar from "../components/navBar"
import { rhythm } from "../utils/typography"
import Footer from '../components/footer'

type Data = {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string
          frontmatter: {
            title: string
            date: string
            description: string
          }
          fields: {
            slug: string
          }
        }
      }[]
    }
  }

  const AboutMe = ({data, location}: PageProps<Data>)=>{

    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout location={location} title={siteTitle}>
            <NavBar/>
            <div>
                <h1>This is a page about me</h1>
            </div>
            <Footer></Footer>
        </Layout>
    )
  }

  export default AboutMe

  export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
