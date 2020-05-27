import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"
import Arrow from "../components/arrow"
import PageLink from "../components/pageLink"

class Projects extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const allWebsites = data.websites.nodes[0].frontmatter.websites;
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
                    <div className='project-caption l1'>
                      <p className='title text-white m0'>{node.frontmatter.title}</p>
                      <p className='description m0'>{node.frontmatter.description}</p>
                    </div>
                    <Image style={{backgroundColor:`${node.frontmatter.color}`}}
                      fluid={node.frontmatter.featureImage.childImageSharp.fluid}
                      alt={node.frontmatter.title}/>  
                  </PageLink>
                )}
              </div>
            )
          })}
        </div>
        <div className='featured-websites p1 pt0 ml1'>
          {allWebsites.map(function(website){
            return (
              <div className='website-feature align-items--center flex bt1 pt1 pb1' key={website.name}>
                <div className='website-image width-25'>
                  <a href={website.link} rel='noopener noreferrer' target='_blank'>
                    <div className='image-2-1'>
                       <Image className='background-image' fluid={website.image.childImageSharp.fluid} alt={website.name} />  
                    </div>
                  </a>
                </div>
                <div className='title ma'>
                  <p className='h3 common text-black m0'>{website.name}</p>
                </div>
                <div className='external-link width-25 text-right'>
                  <a className='link text-black' href={website.link} rel='noopener noreferrer' target='_blank'>View Website <Arrow /></a>
                </div>
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
    websites: allMdx(filter: {fields: {slug: {eq: "/projects/"}}}) {
      nodes {
        frontmatter {
          websites {
            name
            link
            image {
              childImageSharp {
                fluid(maxWidth: 600, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
