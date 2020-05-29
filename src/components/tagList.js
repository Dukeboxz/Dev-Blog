import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"


 

const TagList = () => {

   const tagTest = useStaticQuery( graphql`
   query tagListQuery{
     allMarkdownRemark {
       group(field: frontmatter___tags, limit: 3) {
         totalCount
         fieldValue
       }
     }
   }
 `)

   const tags = tagTest.allMarkdownRemark.group
   
  
    return (

      <div>
      <h3>Tag List</h3>

      {tags.map(function(tag, index){

          return( 
            <Link key={index}
            to="/" state={{theTag: tag.fieldValue}}>
              <div >
             
                {tag.fieldValue.toUpperCase()}</div>
                </Link>
          )
      })}
      </div>
      
    )
}





 export default TagList