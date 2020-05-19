import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SlideLink from "../components/slideLink"
import Image from "gatsby-image"
import gsap from 'gsap'

class ProjectPostTemplate extends React.Component {
  constructor() {
    super();
    this.previewProject = this.previewProject.bind(this);
    this.hidePreview = this.hidePreview.bind(this);
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
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div style={{backgroundColor:`${post.frontmatter.color}`}}>   
          <div className='project-caption'>{post.frontmatter.title}</div>
          {post.frontmatter.featureImage && (
            <Image
            fluid={post.frontmatter.featureImage.childImageSharp.fluid}
            alt="Project Image" style={{ width: '100%'}} />
          )}    
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

        <div className="flex p1 pb2 pt2 mt2 ml1">
          {previous && previous.frontmatter.type === 'project' && (
            <div onMouseOver={this.previewProject} onMouseOut={this.hidePreview} onBlur={this.hidePreview} onFocus={this.previewProject} role='link' tabIndex={0} className='next-project text-center width-100'>
              <SlideLink direction="down" to={`project${previous.fields.slug}`} rel="previous">
                <p className="text-grey m0">Next Project</p>
                <p className="h0 m0 text-black mb1">{previous.frontmatter.title}</p>
              </SlideLink>
            </div>
          )}
        </div>
        {previous && previous.frontmatter.type === 'project' && (
          <div className='project-preview'>
            <img className='width-100' src={previous.frontmatter.featureImage.childImageSharp.fluid.srcWebp} alt='Next Project' />
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
