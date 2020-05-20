import React from "react"
import Layout from "../components/layout"
import Image from "gatsby-image"
import Arrow from "../components/arrow"
import SEO from "../components/seo"
import PageLink from "../components/pageLink"
import Cursor from "../components/cursor"

class IndexPage extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = "Sites by Groundcrew"
    const projects = data.allMdx.edges
    const post = data.blog.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

        <div className="image-wrapper" style={{backgroundColor:`#351f44`}}>
          <Image className="image-full" fluid={data.hero.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
        </div>

        <div className='height-100 flex flex-wrap'>
          <div className="intro width-100 ml1 pl1 p1" style={{ marginBottom:`150px`, maxWidth:`950px`}}> 
            <h2><span className="common">We’re Groundcrew</span> a boutique and independent  brand and digital design studio based in Newstead, Brisbane.</h2>
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
                    <Image style={{backgroundColor:`${node.frontmatter.color}`}}
                      fluid={node.frontmatter.featureImage.childImageSharp.fluid}
                      alt={node.frontmatter.title}/>  
                  </PageLink>
                )}
              </div>
            )
          })}
        </div>
        <div className="blog flex pb20 bb1 p1 pl1 ml1">
          <div className="width-50 br1 pr1">
            <PageLink to='/blog'>
              <p className="h2 text-black">
              Fresh of the press <br />
              See all <Arrow size='large'></Arrow>
              </p>
            </PageLink>
          </div>
          <div className='width-50 pl1'>
            {post.map(({ node }) => {
              return (
                <div className="single-project" key={node.fields.slug}>
                  <div className='max-375 mb2'>
                    <p className='text-black m0'>{node.frontmatter.title}</p>
                    <p className='mt20' dangerouslySetInnerHTML={{ __html: node.frontmatter.description}}/>
                    <p className='text-black m0'>Read <Arrow></Arrow></p>
                  </div>
                  {node.frontmatter.image && (
                    <PageLink to={`blog${node.fields.slug}`}>
                      <Image
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                      alt="Groundcrew" style={{ width: '100%', }}/>
                    </PageLink>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className='contact height-80 flex flex-wrap'>
          <div className='ml1 p1'>
            <PageLink to='/contact'>
              <p className="h2 text-black">
                <span className='common'>Have a project</span> <br />
                Let's talk <Arrow size='large'></Arrow>
              </p>
            </PageLink>
          </div>
        </div>
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
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      limit:1
      filter: {fileAbsolutePath: {regex: "/blog/"}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 90) {
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