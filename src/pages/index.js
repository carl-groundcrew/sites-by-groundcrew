import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
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

        <div class="image-wrapper" style={{backgroundColor:`#351f44`}}>
          <Image fluid={data.hero.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
        </div>
        <div class="intro" style={{  padding:`40px`, marginBottom:`150px`}}> 
          <h3><span class="common">We’re Groundcrew</span> a boutique and independent  <br/>brand and digital design studio based in Newstead, Brisbane.</h3>
        </div>

        <div className="projects" style={{ paddingBottom:`40px`}}>
          {posts.map(({ node }) => {
            return (
              <div className="single-project" key={node.fields.slug}>

                <Link style={{ boxShadow: `none`, color:`#000`  }} to={`project${node.fields.slug}`}>
                    <Image
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                      alt={node.frontmatter.title}/> 
                </Link>
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
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 90) {
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
            image {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
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