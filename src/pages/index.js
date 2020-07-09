import React from "react"
import Layout from "../components/layout"
import Image from "gatsby-image"
import Arrow from "../components/arrow"
import ContactBanner from "../components/contactBanner"
import FeaturedPost from "../components/featuredPost"
import SEO from "../components/seo"
import PageLink from "../components/pageLink"
import ProjectLink from "../components/projectLink"
import Cursor from "../components/cursor"

class IndexPage extends React.Component {
  
  mouseOver(e) {
    var title =  e.target.closest(".single-project").getAttribute('data-title');
    document.querySelector('.cursor .title').innerHTML = title;
    const cursor = document.querySelector(".cursor")
    cursor.classList.add("active")
  }
  mouseOut() {
    const cursor = document.querySelector(".cursor")
    cursor.classList.remove("active")
  }
  mouseMove(e) {
    const cursor = document.querySelector(".cursor")
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  }

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
        <div className="projects">
          {projects.map(({ node }) => {
            return (
              <div className="single-project position-relative with-cursor" data-title={node.frontmatter.title} role='link' tabIndex={0} onBlur={this.mouseOut} onMouseMove={this.mouseMove} onMouseEnter={this.mouseOver} onMouseOut={this.mouseOut} key={node.fields.slug}>
                <div className='project-information text-grey right-rotated' data-sal><p className='fade-out-left'>Featured by: <span className='text-white'>Awwwards / UIJAR / Mindsparkle</span></p></div>
                {node.frontmatter.featureImage && (
                  <ProjectLink to={`project${node.fields.slug}`} project={node.frontmatter.title} caption={node.frontmatter.description}>
                    <Image className='min-height-100' style={{backgroundColor:`${node.frontmatter.color}`}}
                      fluid={node.frontmatter.featureImage.childImageSharp.fluid}
                      alt={node.frontmatter.title}/>  
                  </ProjectLink>
                )}
              </div>
            )
          })}
        </div>
        <FeaturedPost />
        <ContactBanner />
         <Cursor /> 
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