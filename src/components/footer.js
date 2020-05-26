import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"



const Footer = () => {
    
    const data = useStaticQuery(graphql`
    {
      allFile(filter: {relativePath: {}, relativeDirectory: {eq: "Icons"}}) {
        totalCount
        nodes {
          childImageSharp {
            fluid {
              src
              originalName
              originalImg
            }
          }
        }
      }
    }
    `)

    return (

        <div style={{
            display: `flex`,
            margin: rhythm(1.5)
        }} >
            <div>
           <br></br>
            </div>

            <a href="https://github.com/Dukeboxz">
                <img width="75" height="75" alt="My Github Profile" 
                 src={data.allFile.nodes[0].childImageSharp.fluid.src}></img>
            </a>
            <a href="https://www.linkedin.com/in/stephenjjackson/">
                <img width="100" height="75" alt="My LinkedIn Profile"
                  src={data.allFile.nodes[1].childImageSharp.fluid.src}></img>
            </a>

        </div>
    )
}

// export const query = graphql`
//   {
//     allFile(filter: {relativePath: {}, relativeDirectory: {eq: "Icons"}}) {
//       totalCount
//       nodes {
//         childImageSharp {
//           fluid {
//             src
//             originalName
//             originalImg
//           }
//         }
//       }
//     }
//   }
//   `

export default Footer