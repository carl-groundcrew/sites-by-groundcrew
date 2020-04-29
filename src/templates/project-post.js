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
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
       
        <Image
          fluid={post.frontmatter.image.childImageSharp.fluid}
          alt="Groundcrew"
          style={{
            marginBottom: 0,
            width: '100%',
          }}
        /> 

        <div style={{ padding: `40px`, maxWidth: `100%`}}>
          <p>{post.frontmatter.title}</p>
          <MDXRenderer>{post.body}</MDXRenderer>
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
        image {
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
