/**
 *  Imagery
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

function secondImagery() {
  return (
    <StaticQuery
      query={secondQuery}
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

const secondQuery = graphql`
  query secondQuery {
    hero: file(absolutePath: { regex: "/six.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    cherub: file(absolutePath: { regex: "/seven.jpg/" }) {  
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    redvets: file(absolutePath: { regex: "/eight.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    notion: file(absolutePath: { regex: "/nine.jpg/" }) { 
      childImageSharp {
        fluid(maxWidth: 1600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    plantpeople: file(absolutePath: { regex: "/ten.jpg/" }) { 
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

export default secondImagery