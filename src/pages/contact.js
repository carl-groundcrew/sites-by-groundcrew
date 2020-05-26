import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Contact extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Get In Touch" />
        <div className='ml1 p1 height-100f'>
          <div className='max-750'>
            <h2 className='h1 mb1'>Groundcrew is literally the best agency in the world.</h2>
            <h2 className='h1 mb1'>Facts.</h2>
            <p className='m0'>If you agree get in touch with us below.</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
