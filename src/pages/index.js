import React from "react"
import Layout from "../components/layout"
import Image from "gatsby-image"
import Arrow from "../components/arrow"
import ContactBanner from "../components/contactBanner"
import FeaturedPost from "../components/featuredPost"
import SEO from "../components/seo"
import PageLink from "../components/pageLink"
import Cursor from "../components/cursor"

class IndexPage extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = "Sites by Groundcrew"
    const projects = data.allMdx.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

        <div className="height-100 position-relative" style={{ backgroundColor: '#000' }}>
          <video className='background-video' autoPlay muted loop>
            <source src='https://studiobrave.com.au/wp-content/uploads/2019/04/Studio-Brave-Website-A-Vimeo-1080p.mp4' type="video/mp4" />
          </video>
        </div>

        <div className='height-100 flex flex-wrap'>
          <div className="intro width-100 ml1 pl1 p1" style={{ marginBottom:`150px`, maxWidth:`950px`}}> 
            <h2><span className="uppercase">We’re Groundcrew</span> a boutique and independent  brand and digital design studio based in Newstead, Brisbane.</h2>
          </div>
          <div className="title-area width-100 align-self--bottom flex p1 pl2">
            <span className="m0">Featured Projects</span>
            <div className='mla'>
              <PageLink to='/projects'>
                <span className="m0 text-black">See All <Arrow /></span>
              </PageLink>
            </div>
          </div>
        </div>
        <div className="projects with-cursor" role='link' tabIndex={0}  
            onMouseMove={e => {
              const cursor = document.querySelector(".cursor")
              cursor.style.left = `${e.clientX}px`
              cursor.style.top = `${e.clientY}px`
            }}
            onMouseLeave={() => {
              const cursor = document.querySelector(".cursor")
              cursor.classList.remove("active")
            }}
            onMouseEnter={() => {
              const cursor = document.querySelector(".cursor")
              cursor.classList.add("active")
            }}
          >
          <Cursor /> 
          {projects.map(({ node }) => {
            return (
              <div className="single-project position-relative" key={node.fields.slug}>
                <div className='project-caption'>{node.frontmatter.title}</div>
                <div className='project-information text-grey right-rotated' data-sal><p className='fade-out-left'>Featured by: <span className='text-white'>Awwwards / UIJAR / Mindsparkle</span></p></div>
                {node.frontmatter.featureImage && (
                  <PageLink to={`project${node.fields.slug}`}>
                    <Image className='min-height-100' style={{backgroundColor:`${node.frontmatter.color}`}}
                      fluid={node.frontmatter.featureImage.childImageSharp.fluid}
                      alt={node.frontmatter.title}/>  
                  </PageLink>
                )}
              </div>
            )
          })}
        </div>
        <FeaturedPost />
        <ContactBanner />
      </Layout>
    )
  }
}
 
export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {homepage: {eq: "True"}, type: {eq: "project"}}}) {
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