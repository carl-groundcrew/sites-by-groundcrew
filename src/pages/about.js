import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About Groundcrew" />
        <div className="image-wrapper" style={{backgroundColor:`#351f44`}}>
          <Image className="image-full" fluid={data.hero.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
        </div>
        <div className='flex flex-wrap'>
          <div className="intro width-100 ml1 pl1 p1" style={{ marginBottom:`250px`, maxWidth:`950px`}}> 
            <h2><span className="common">We’re Groundcrew</span> a boutique and independent  brand and digital design studio based in Newstead, Brisbane.</h2>
          </div>
        </div>
        <div className='team ml1 p1 mt2'>
          <h2><span className="common">Our Team</span></h2>
          <div className='members mt1'>
            
            <div className='row flex'>
              <div className='member width-50 pr20 mb1 fade-up' data-sal>
                <div className='image mb1'>
                  <Image fluid={data.joel.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Joel Mechielsen</p>
                  <p className='m0'>Company Director</p>
                </div>
              </div>
              <div className='member width-50 mb1 pl20 fade-up delay' data-sal>
                <div className='image mb1'>
                  <Image fluid={data.foster.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Ben Burton</p>
                  <p className='m0'>Company Director</p>
                </div>
              </div>
            </div>

            <div className='row flex'>
              <div className='member width-50 pr20 mb1 fade-up' data-sal>
                <div className='image mb1'>
                  <Image fluid={data.ben.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Ben Conley</p>
                  <p className='m0'>Art Director</p>
                </div>
              </div>
              <div className='member width-50 pl20 mb1 fade-up delay' data-sal>
                <div className='image mb1 mb1'>
                  <Image fluid={data.marly.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Marly Conley</p>
                  <p className='m0'>Senior Designer</p>
                </div>
              </div>
            </div>

            <div className='row flex'>
              <div className='member width-50 pr20 mb1 fade-up' data-sal>
                <div className='image mb1'>
                  <Image fluid={data.carl.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Carl Beaverson</p>
                  <p className='m0'>Senior Developer</p>
                </div>
              </div> 
              <div className='member width-50 pl20 mb1 fade-up delay' data-sal>
                <div className='image mb1 mb1'>
                  <Image fluid={data.jole.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Joel Matheson</p>
                  <p className='m0'>Wizardboy</p>
                </div>
              </div>
            </div>

            <div className='row flex'>
              <div className='member width-50 pr20 mb1 fade-up' data-sal>
                <div className='image mb1'>
                  <Image fluid={data.placeholder.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Jackson Todd</p>
                  <p className='m0'>Designer</p>
                </div>
              </div>
              <div className='member width-50 pl20 fade-up delay' data-sal>
                <div className='image mb1 mb1'>
                  <Image fluid={data.placeholder.childImageSharp.fluid} alt="Hero Image - Groundcrew" /> 
                </div>
                <div className='information'>
                  <p className='m0 text-black'>Amelie Hirschland</p>
                  <p className='m0'>Designer</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    hero: file(relativePath: { eq: "team.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    joel: file(relativePath: { eq: "team/joel.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    foster: file(relativePath: { eq: "team/foster.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    ben: file(relativePath: { eq: "team/ben.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    marly: file(relativePath: { eq: "team/marly.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    carl: file(relativePath: { eq: "team/carl.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    jole: file(relativePath: { eq: "team/jole.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    placeholder: file(relativePath: { eq: "team/placeholder.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
