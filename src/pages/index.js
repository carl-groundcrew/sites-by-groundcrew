import React from "react"
import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import PageLink from "../components/pageLink"

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

        <div className="image-wrapper" style={{backgroundColor:`#351f44`}}>
          <Image className="image-full" fluid={data.hero.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
        </div>
        <div className="intro" style={{  padding:`40px`, paddingLeft:`60px`, marginBottom:`150px`, maxWidth:`950px`}}> 
          <h3><span className="common">We’re Groundcrew</span> a boutique and independent  brand and digital design studio based in Newstead, Brisbane.</h3>
        </div>

        <div className="projects" style={{ paddingBottom:`40px`}}>
          <div className="title-area flex" style={{ padding:`20px 40px`, paddingLeft:`60px`,}}>
            <span className="m0">Featured Projects</span>
            <span className="m0 mla">See All</span>
          </div>
          {posts.map(({ node }) => {
            return (
              <div className="single-project" key={node.fields.slug}>
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
  }
`