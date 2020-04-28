import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Banner from "../components/banner"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = "Sites by Groundcrew"
    const posts = data.allMdx.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

       <Banner /> 

        <div className="projects" style={{ margin: "40px" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div className="single-project" key={node.fields.slug}>

                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: `none`, color:`#000`  }}
                    to={`project${node.fields.slug}`}
                  >
                    {title}
                  </Link>
                </h3>
                 
                <p
                  style={{ boxShadow: `none`, color:`#000`  }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            )
          })}
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
     allMdx(filter: {fileAbsolutePath: {regex: "/projects/"}}) {
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
          }
        }
      }
    }
  }
`