import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"
import PageLink from "../components/pageLink"

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges;
    var postNo = 1;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div className='ml1 p1'>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug 
            postNo = postNo + 1;         
            return (
              <div className={'blog-post pb1 mb1 bb1 direction-'+(postNo%2 ? 'r':'l')} key={node.fields.slug}>
                  <div className='flex'>
                    <div className='width-50'>
                        <div className="max-375">
                          <PageLink to={`blog${node.fields.slug}`}>
                            <p className='link m0 text-black'>{title} {node.index}</p>
                            <p className='mt20 mb2' dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt}}/>
                          </PageLink>
                        </div>
                    </div>
                    <div className='width-50 pt1'></div>
                  </div>
                  <div className='flex'>
                    <div className='width-50 pt1'></div>
                    <div className='width-50'>
                      {node.frontmatter.image && (
                        <PageLink to={`blog${node.fields.slug}`}>
                          <Image
                          fluid={node.frontmatter.image.childImageSharp.fluid}
                          alt="Groundcrew" style={{ width: '100%', }}/>
                        </PageLink>
                      )}
                    </div>
                  </div>
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/blog/"}}
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
