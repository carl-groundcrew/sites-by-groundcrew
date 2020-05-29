import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PageLink from "../components/pageLink"

class ProjectLinks extends React.Component {
  render() {
  return (
    <StaticQuery
      query={linkQuery}
      render={data => {
        const projects = data.projects.edges
        return (
          <div className='infinite-menu'>
            {projects.map(({ node }) => {
                return (
                  <PageLink to={`project${node.fields.slug}`} key={node.frontmatter.title}>
                    <p className='menu-item text-black h1 m0'>{node.frontmatter.title}</p>
                  </PageLink>
                )
              })}
          </div>
        )
      }}
    />
  )}
}

const linkQuery = graphql`
  query linkQuery {
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {type: {eq: "project"}}}) {
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

export default ProjectLinks
