import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PageLink from "../components/pageLink"
import Image from "gatsby-image"
import Arrow from "../components/arrow"

function FeaturedPost() {
  return (
    <StaticQuery
      query={postQuery}
      render={data => {
        const post = data.blog.edges
        return (
          <div className="blog flex pb20 bb1 p1 pl1 ml1">
            <div className="width-50 br1 pr1">
              <PageLink to='/blog'>
                <p className="h2 text-black">
                <span className='common'>Fresh of the press</span><br />
                See all <Arrow size='large'></Arrow>
                </p>
              </PageLink>
            </div>
            <div className='width-50 pl1'>
              {post.map(({ node }) => {
                return (
                  <div className="single-project" key={node.fields.slug}>
                    <div className='max-375 mb2'>
                      <p className='text-black m0'>{node.frontmatter.title}</p>
                      <p className='mt20' dangerouslySetInnerHTML={{ __html: node.frontmatter.description}}/>
                      <p className='text-black m0'>Read <Arrow></Arrow></p>
                    </div>
                    {node.frontmatter.image && (
                      <PageLink to={`blog${node.fields.slug}`}>
                        <Image
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                        alt="Groundcrew" style={{ width: '100%', }}/>
                      </PageLink>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    />
  )
}

const postQuery = graphql`
  query postQuery {
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      limit:1
      filter: {fileAbsolutePath: {regex: "/blog/"}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
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

export default FeaturedPost
