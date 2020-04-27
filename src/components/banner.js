/**
 *  Homepage Banners
 *
 *
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

function Banner() {
  return (
    <StaticQuery
      query={bannerQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div>
            <Container>  
              <Image
                fluid={data.hero.childImageSharp.fluid}
                alt={author}
                style={{
                  marginBottom: 0,
                  width: '100%',
                }}
              /> 
            </Container>
            <Container>  
              <Image
                fluid={data.cherub.childImageSharp.fluid}
                alt={author}
                style={{
                  marginBottom: 0,
                  width: '100%',
                }}
              /> 
            </Container>
            <Container>  
              <Image
                fluid={data.redvets.childImageSharp.fluid}
                alt={author}
                style={{
                  marginBottom: 0,
                  width: '100%',
                }}
              /> 
            </Container>
            <Container>  
              <Image
                fluid={data.notion.childImageSharp.fluid}
                alt={author}
                style={{
                  marginBottom: 0,
                  width: '100%',
                }}
              /> 
            </Container>
            <Container>  
              <Image
                fluid={data.plantpeople.childImageSharp.fluid}
                alt={author}
                style={{
                  marginBottom: 0,
                  width: '100%',
                }}
              /> 
            </Container>
          </div>
        )
      }}
    />
  )
}

const bannerQuery = graphql`
  query bannerQuery {
    hero: file(absolutePath: { regex: "/hero.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    cherub: file(absolutePath: { regex: "/cherub.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    redvets: file(absolutePath: { regex: "/redvets.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    notion: file(absolutePath: { regex: "/notion.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    plantpeople: file(absolutePath: { regex: "/plant-people.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

const Container = styled.div`
  display: flex;
`

export default Banner
