import React from "react"
import { PageProps, Link, graphql, useStaticQuery } from "gatsby"


import Layout from "../components/layout"

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
          <br></br>
          <p>
            Below is a summery of my skills and employment history.  My full cv can be download 
            <a href="content/assets/Stephen_Jackson_CV.pdf" download> Here</a>
          </p>
         
            <div className="Skills">
                <h3>Skills </h3>
                <p>
                  <strong>C# .Net Programming</strong>
                   - Have developed skills in creating readable, maintainable code by implementing the business logic of  web applications including
                   IO operations with database and file system, HTTP calls to external API’s, and the creation of dynamic maps and images. Have also now started to create stand alone services in .net Core so that they can be run on Linux servers. 
                </p>
               
                <p>
                  <strong>UI Development </strong>
                   - Used Javascript, JQuery and CSS to create dynamic widgets for a web application that would display information
                   such as maps and data tables on a variety of different media.  
                </p>
                <p>
                  <strong>SQL</strong>
                  – Have used T-SQL to create complex stored procedures with joins across tables 
                  and databases and logic dependent on giving parameters.  
                </p>
                <p>
                  <strong>Testing </strong>
                  – I ensure the code I write is robust by writing unit tests using MSTest and the FakeItEasy library
                   as well as creating manual testing steps to test UI.  
                </p>
                <p>
                  <strong>Working As Part Of A Team </strong>
                  – Experienced in working with a team that uses Agile working methods and completes work in 2 week sprints using git and Azure Dev Express to manage source code.  As part of this must work with users and project managers to 
                  develop clear requirements and estimate the time needed to complete.  
                </p>
                <p>
                  <strong>Communication </strong>
                  – Worked with sales and technical support to interpret customer request and decide what features could be developed to meet requirements.  As part of this I had to communicate the technical challenges involved and explain 
                  the impact of the decisions we make on the wider application.   
                </p>
                <p>
                  <strong>Project Management </strong>
                  – Have managed project from specification to delivery within set timescale and budget. 
                   Including change management projects that involved new IT systems.
                </p>
                <p>
                  <strong>Problem Solving  </strong>
                  - A problem I have solved in my latest role was that our finance department wanted to retrieve a list of customers edit the data and then save it again.  The problem was that the process was taking a long time to 
                  load all customer data, edit records and then send data back to be saved.  I solved this problem by replacing the call to get all customers with a ajax call that send parameters back to a stored procedure a wrote.  This meant the customers were only loaded for the page the user was on.  To improving the editing rather than coding my own solution I used Dev Express Data Grid Edit widget.  This allowed bulk editing and also did a call back to the serve each time a edit was made.  This allowed me to save edits as they were done in a server session variable rather than all at the end.  This all meant that a task that user to take the user over an hour to complete now took less than 20 mins.      
                </p>
                <p>
                  <strong>Commitment To Further Learning</strong>
                  - As part of my commitment to improving my skills I decided to crate a website for a code club a run using MongoDB, ExpressJS,
                   NodeJS and Angular 2 technologies that I am not as familiar with.   
                </p>

            </div>
            <div className="Employment">
              <h3>Employment And Eduction</h3>
              <strong>.Net Developer Paul Smith Ltd </strong><p> August 2019 – Present </p><br></br>
              <p>Working as part of a small development team I am responsible for development of web and desktop applications that allow the running of business critical systems in the receiving and distribution of stock.  Using the MVC and MVVM patterns to create applications that will link into 3rd Party Logistics Systems and also display data in a way that can be analysed to make business decisions.  Technologies that are used daily are C# .net Framework, Javascript, knockoutJs, HTML, Bootstrap, Dev Express,  TSQL, Git, Azure DevOps.
              A further part of my role is take responsibility to ensure that any errors reported by users are evaluated and fixed in a timely manner.  I also guide the work and give assistance to 2 junior developers on the team.  </p>

              <strong>Junior Software Engineer Technolog Ltd </strong><p>October 2017 – August 2019</p><br></br>
              <p>Working as part of a team of 6 developers responsible for development and maintenance of web applications that allowed customers in the water and gas industry to receive, analyse and display data from the logging equipment. Using Javascript, CSS and c~ .net framework   </p>

              <strong> MSc Computer Science - University Of Birmingham </strong><p>September 2016 – September 2017</p><br></br>
              <p>Intensive full time one year course that concentrated on developing hands on experience with the fundamental of computer language through learning Java language and solving programming problems. As part of the course I have also passed modules in the following areas:
               <ul>
                 <li>Software Engineering – including software development models, architecture styles and software management methodologies</li>
                 <li>Databases – Database design and SQL</li>
                 <li> Human Computer Interaction  - Best practise in UI design</li>
                 <li>Operating Systems</li>
                 <li>Operating Systems</li>
                 <li>Data Structures and Algorithms</li>
                
               </ul>
               </p>

              <strong>Regeneration & Growth Manager</strong><p>Amber Valley Borough Council  ( 1.10.14 – 31.3.16) </p><br></br>
              <p>Managed a multidisciplinary team to deliver a range of Planning and Regeneration projects while implementing a change strategy intended to give a more flexible and effective team with more efficient processes. This included:
Developing and managing the implementation of a new structure for the team that delivered a more cost effective service.  
Writing specification for councils IT dept. for new system to support the work of the unit.  
Working with the IT department to evaluate prototype systems and prioritise features to be developed next. 
It was through this working that I became interested in the process of developing software and decided that I wanted to make it my career.  </p>
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
