import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

class ProjectPostTemplate extends React.Component {

  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next} = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        
        <div style={{backgroundColor:`${post.frontmatter.color}`}}>
          {!post.frontmatter.projectImage1 && (
            <Image
            fluid={post.frontmatter.image.childImageSharp.fluid}
            alt="Project Image" style={{ width: '100%'}} />
          )}        
          {post.frontmatter.projectImage1 && (
            <Image
            fluid={post.frontmatter.projectImage1.childImageSharp.fluid}
            alt="Groundcrew" style={{ width: '100%', }}  />
          )} 
        </div>

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

        

        <div className="flex pb20 bb1" style={{ padding: `40px`}}>
          <div className="half pr1 br1" style={{ paddingBottom: `150px`}}>
            <div style={{maxWidth: `750px`}}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
          </div>
          <div className="half pl1">
            {post.frontmatter.collaborations && (
              <div>
                <p className="black mb0">Collaborations</p>
                <p>{post.frontmatter.collaborations}</p>
              </div>
            )}
            {post.frontmatter.website && (
              <div>
                <p className="black mb0">View Website</p>
                <p><a href={post.frontmatter.website}  rel="noopener noreferrer" style={{ color: `#9e9e9e` }} target="_blank">{post.frontmatter.website}</a></p>
              </div>
            )}
          </div>
        </div>

        <ul
          style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, listStyle: `none`,  padding:`20px 40px` }}>
          <li>
            {previous && (
              <Link to={`project${previous.fields.slug}`} style={{ color: `#000`, boxShadow: `none` }} rel="prev"> ← {previous.frontmatter.title} </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`project${next.fields.slug}`} rel="next" style={{ color: `#000`, boxShadow: `none` }}> {next.frontmatter.title} → </Link>
            )}
          </li>
        </ul>

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
        image {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        projectImage1 {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
