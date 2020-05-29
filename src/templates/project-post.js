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
    var website = post.frontmatter.website;
    if(website) {
      var url = website.split("//")[1];
    }
    //var mobileClass = '';
    //if(post.frontmatter.mobileImage) {
    var mobileClass = 'mobile-hide'
    //} else {
    // mobileClass = ''
    //}

    return (
      <Layout location={this.props.location} title={siteTitle}>
        
        <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
        
        <div className='project-banner position-relative' style={{backgroundColor:`${post.frontmatter.color}`}}>   
          
          {post.frontmatter.featureImage && (
            <Image className={'width-100 min-height-100 '+mobileClass}
            fluid={post.frontmatter.featureImage.childImageSharp.fluid}
            alt="Project Banner Desktop" />
          )}  

          {post.frontmatter.featureImage && (
            <Image className='min-height-100 mobile-show'
            fluid={post.frontmatter.featureImage.childImageSharp.fluid}
            alt="Project Image" style={{ width: '100%'}} />
          )}
         
          <p className='project-information fade-out-right fade-in-left'>Featured by: <span className='text-white'>Awwwards / UIJAR / Mindsparkle</span></p>  
        </div>

        {post.frontmatter.galleryImages && (
          <div className='gallery-images'>
            {post.frontmatter.galleryImages.map((node, i) => { 
              return (
                <div className='project-asset' key={i}>
                  {node.image && (
                  <Image className='mobile-hide' fluid={node.image.childImageSharp.fluid}
                    alt={'Project Image '+(i)} style={{ width: '100%'}} />  
                  )}   
                  {node.image && (      
                    <Image className='mobile-show' fluid={node.image.childImageSharp.fluid}
                    alt={'Mobile Project Image '+(i)} style={{ width: '100%'}} />
                  )}
                  {node.video && (
                    <video className='mobile-hide' style={{ width: '100%'}} autoPlay muted loop>
                      <source src={node.video} type="video/mp4" />
                    </video>
                  )}
                </div> 
              )
            })}
          </div>

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
                <p><a className="page-link" href={website}  rel="noopener noreferrer" style={{ color: `#9e9e9e` }} target="_blank">{url}</a></p>
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
              <div className="video-overlay pt2 pb2 mla mra mt2 mb2 text-center">
                <PageLink to='/projects' rel="back">
                  <p className="text-grey m0">Back to all</p>
                  <p className="h0 m0 mla mra text-black mb1">Projects</p>
                </PageLink>
              </div>
            </div>
          )}
        </div>
        {previous && previous.frontmatter.type === 'project' && (
          <div className='project-preview'>
            {previous.frontmatter.featureImage && (
              <Image className={'width-100 min-height-100 '+mobileClass}
              fluid={previous.frontmatter.featureImage.childImageSharp.fluid}
              alt="Project Image" />
            )}
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
        galleryImages {
          image {
            childImageSharp {
              fluid(maxWidth: 3000, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          video
        }
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
