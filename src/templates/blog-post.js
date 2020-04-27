import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Imagery from "../components/imagery"
import Second from "../components/secondImagery"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    let Images
    Images = (
        <Imagery /> 
    )
    if (post.frontmatter.title === 'Archie Bolden') {
      Images = (
        <Imagery /> 
      )
    } else {
      Images = (
        <Second /> 
      )
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        {Images}

        <div style={{ padding: `40px`, maxWidth: `700px`}}>
          <p>{post.frontmatter.title}</p>
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
       
        <ul
          style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, listStyle: `none`,  padding:`20px 40px` }}>
          <li>
            {previous && (
              <Link to={`blog${previous.fields.slug}`} style={{ color: `#000`, boxShadow: `none` }} rel="prev"> ← {previous.frontmatter.title} </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`blog${next.fields.slug}`} rel="next" style={{ color: `#000`, boxShadow: `none` }}> {next.frontmatter.title} → </Link>
            )}
          </li>
        </ul>

      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        image
        anotherImage
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
