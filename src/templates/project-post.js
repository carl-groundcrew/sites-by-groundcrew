import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SlideLink from "../components/slideLink"
import Image from "gatsby-image"
import PageLink from "../components/pageLink"
import gsap from 'gsap'

class ProjectPostTemplate extends React.Component {
  constructor() {
    super();
    this.previewProject = this.previewProject.bind(this);
    this.hidePreview = this.hidePreview.bind(this);
    this.previewAllProjects = this.previewAllProjects.bind(this);
    this.hideAllProjects = this.hideAllProjects.bind(this);
  }

  previewAllProjects() {
    const tl = gsap.timeline({paused: true});
    tl.to( document.querySelectorAll('.background-video'), { opacity: 1, ease: 'power1.out', duration:1})
    tl.to( document.querySelectorAll('.video-overlay p'), { color: '#fff', ease: 'power1.out', duration:1}, '-=1')
    tl.play();
  }

  hideAllProjects() {
    const tl = gsap.timeline({paused: true});
    tl.to( document.querySelectorAll('.background-video'), { opacity: 0, ease: 'power1.out', duration:1})
    tl.to( document.querySelectorAll('.video-overlay p'), { color: '#000', ease: 'power1.out', duration:1}, '-=1')
    tl.play();
  }

  previewProject() {
    const tl = gsap.timeline({paused: true});
    tl.to( document.querySelectorAll('.project-preview'), { height: '5vh', ease: 'power1.out', duration:.5})
    tl.to( document.querySelectorAll('.footer'), { y: '-5vh', ease: 'power1.out', duration:.5}, '-=.5')
    tl.to( document.querySelectorAll('.main-header .logo, .header-break'), { y: '-5vh', ease: 'power1.out', duration:.5}, '-=.5')
    tl.play();
  }

  hidePreview() {
    const tl = gsap.timeline({paused: true});
    tl.to( document.querySelectorAll('.project-preview'), { height: 0, ease: 'power1.out', duration:.5})
    tl.to( document.querySelectorAll('.footer'), { y: 0, ease: 'power1.out', duration:.5}, '-=.5')
    tl.to( document.querySelectorAll('.main-header .logo, .header-break'), { y: 0, ease: 'power1.out', duration:.5}, '-=.5')
    tl.play();
  }

  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        
        <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
        
        <div className='project-banner position-relative' style={{backgroundColor:`${post.frontmatter.color}`}}>   
          {post.frontmatter.featureImage && (
            <Image
            fluid={post.frontmatter.featureImage.childImageSharp.fluid}
            alt="Project Image" style={{ width: '100%'}} />
          )}  
          <p className='project-information fade-out-right fade-in-left'>Featured by: <span className='text-white'>Awwwards / UIJAR / Mindsparkle</span></p>  
        </div>
        {post.frontmatter.projectImage1 && (
          <Image
            fluid={post.frontmatter.projectImage1.childImageSharp.fluid}
            alt="Groundcrew" style={{ width: '100%', }} />
        )}
        {post.frontmatter.projectImage2 && (
        <Image
          fluid={post.frontmatter.projectImage2.childImageSharp.fluid}
          alt="Groundcrew"
          style={{ width: '100%', }} 
        />
        )}
        {post.frontmatter.projectImage3 && (
        <Image
          fluid={post.frontmatter.projectImage3.childImageSharp.fluid}
          alt="Groundcrew"
          style={{ width: '100%', }} 
        />
        )}
        {post.frontmatter.projectImage4 && (
        <Image
          fluid={post.frontmatter.projectImage4.childImageSharp.fluid}
          alt="Groundcrew"
          style={{  width: '100%', }} 
        />
        )}
        {post.frontmatter.projectImage5 && (
        <Image
          fluid={post.frontmatter.projectImage5.childImageSharp.fluid}
          alt="Groundcrew"
          style={{ width: '100%', }} 
        />
        )}
        {post.frontmatter.projectImage6 && (
        <Image
          fluid={post.frontmatter.projectImage6.childImageSharp.fluid}
          alt="Groundcrew"
          style={{ width: '100%', }} 
        />
        )}
        <div className="flex pb20 bb1 p1 pl1 ml1">
          <div className="half pr1 br1" style={{ paddingBottom: `150px`}}>
            <div style={{maxWidth: `750px`}}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
          </div>
          <div className="half pl1">
            {post.frontmatter.collaborations && (
              <div>
                <p className="text-black mb0">Collaborations</p>
                <p>{post.frontmatter.collaborations}</p>
              </div>
            )}
            {post.frontmatter.website && (
              <div>
                <p className="text-black mb0">View Website</p>
                <p><a className="page-link" href={post.frontmatter.website}  rel="noopener noreferrer" style={{ color: `#9e9e9e` }} target="_blank">{post.frontmatter.website}</a></p>
              </div>
            )}
          </div>
        </div>

        <div className="flex position-relative p1 pb2 pt4 ml1">
          {previous && previous.frontmatter.type === 'project' ? (
            <div onMouseOver={this.previewProject} onMouseOut={this.hidePreview} onBlur={this.hidePreview} onFocus={this.previewProject} role='link' tabIndex={0} className='next-project text-center width-100'>
              <SlideLink direction="down" to={`project${previous.fields.slug}`} rel="previous">
                <p className="text-grey m0">Next Project</p>
                <p className="h0 m0 text-black mb1">{previous.frontmatter.title}</p>
              </SlideLink>
            </div>
          ) : (
            <div className='back-projects flex width-100'>
              <div className="video-overlay pt2 pb2 mla mra mt2 mb2">
                <PageLink to='/projects' rel="back">
                  <button onMouseOver={this.previewAllProjects} onMouseOut={this.hideAllProjects} onBlur={this.hideAllProjects} onFocus={this.previewAllProjects} role='link' tabIndex={0}>
                    <p className="h0 m0 mla mra text-black mb1">Back to all projects</p>
                  </button>
                </PageLink>
              </div>
              <video className='background-video' autoPlay muted loop>
                <source src='https://player.vimeo.com/external/420480222.hd.mp4?s=78d5e122fc5178951c7121983f971600296e1935&profile_id=175' type="video/mp4" />
              </video>
            </div>
          )}
        </div>
        {previous && previous.frontmatter.type === 'project' && (
          <div className='project-preview'>
            <img className='width-100' src={previous.frontmatter.featureImage.childImageSharp.fluid.src} alt='Next Project' />
          </div>
        )}
      </Layout>
    )
  }
}

export default ProjectPostTemplate

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        color
        collaborations
        website
        featureImage {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        projectImage1 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        projectImage2 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        projectImage3 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        projectImage4 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        projectImage5 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        projectImage6 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
