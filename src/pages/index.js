import React from "react"
//import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import TransitionLink from "gatsby-plugin-transition-link"
import gsap from 'gsap'


class IndexPage extends React.Component {
  
  exit(exit, node) {
    return gsap.to(
      node.querySelector('.app'),
      { 
        opacity: 0, 
        ease: 'power1.in',
        duration:.5 
      },
    )
  }

  enter(entry, node) {
    return gsap.from(
      node.querySelector('.app'),
      { 
        opacity: 0,
        ease: 'power1.in',
        duration:.5,
        delay:.25
      },
    )
  }

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
          <Image fluid={data.hero.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
        </div>
        <div className="intro" style={{  padding:`40px`, marginBottom:`150px`, maxWidth:`900px`}}> 
          <h3><span className="common">We’re Groundcrew</span> a boutique and independent  brand and digital design studio based in Newstead, Brisbane.</h3>
        </div>

        <div className="projects" style={{ paddingBottom:`40px`}}>
          {posts.map(({ node }) => {
            return (
              <div className="single-project" key={node.fields.slug}>

                <TransitionLink 
                  exit={{ length:.5, trigger: ({ exit, node }) => this.exit(exit, node)}}
                  entry={{ delay:.5, length:.5, trigger: ({ entry, node }) => this.enter(entry, node)}}
                  to={`project${node.fields.slug}`}>
                  <Image style={{backgroundColor:`${node.frontmatter.color}`}}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                    alt={node.frontmatter.title}/> 
                </TransitionLink>
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