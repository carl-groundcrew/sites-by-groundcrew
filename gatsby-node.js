const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require('gatsby-remark-relative-images');


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const projectPost = path.resolve(`./src/templates/project-post.js`)
  return graphql(
    `
      {
        posts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {frontmatter: {type: {eq: "project"}}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                type 
                featureImage {
                  childImageSharp {
                    fluid(maxWidth: 1600, quality: 90) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
        blog: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {frontmatter: {type: {eq: "blog"}}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                type 
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.posts.edges
    const blog = result.data.blog.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      const path = post.node.frontmatter.type
      const component = path === 'blog' ? blogPost : projectPost
      createPage({
        path: `${path}${post.node.fields.slug}`,
        component: component,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    blog.forEach((post, index) => {
      const previous = index === blog.length - 1 ? null : blog[index + 1].node
      const next = index === 0 ? null : blog[index - 1].node
      const path = post.node.frontmatter.type
      const component = path === 'blog' ? blogPost : projectPost
      createPage({
        path: `${path}${post.node.fields.slug}`,
        component: component,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}
 
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node);

　　 if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
