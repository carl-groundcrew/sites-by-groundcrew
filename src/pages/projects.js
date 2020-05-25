import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"
import PageLink from "../components/pageLink"

class Projects extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const projects = data.allMdx.edges;
    var projectNo =1;
    var classes ='';
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Projects By Groundcrew" />
        <div className='ml1 p1'>
          {projects.map(({ node }) => {

            if(projectNo === 2) {
              classes = 'half left';
            } else if(projectNo === 4) { 
              classes = 'half right';
            } else {
              classes='';
            }

            projectNo = projectNo+1;
            if(projectNo > 4) {
              projectNo = 1;
            }

            return (
              <div className={'single-project position-relative mb1 '+classes} key={node.fields.slug}>
                {node.frontmatter.featureImage && (
                  <PageLink to={`project${node.fields.slug}`}>
                    <div className='project-caption l1'>{node.frontmatter.title}</div>
                    <Image style={{backgroundColor:`${node.frontmatter.color}`}}
                      fluid={node.frontmatter.featureImage.childImageSharp.fluid}
                      alt={node.frontmatter.title}/>  
                  </PageLink>
                )}
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/projects/"}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            color
            featureImage {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            description
          }
        }
      }
    }
  }
`
