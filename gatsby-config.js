var netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
}

module.exports = {
  siteMetadata: {
    // edit below
    title: `Sites By Groundcrew`,
    author: `Groundcrew`,
    description: `Websites by Groundcrew`,
    siteUrl: `https://sites-by-groundcrew.netlify.com`,
    social: {
      twitter: `groundcrew.com.au`,
    },
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-feed-mdx`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/static/assets`,
            name: 'images',
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: `${__dirname}/static/assets`,
            name: 'assets',
        },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `project`,
      },
    },
    netlifyCmsPaths,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          netlifyCmsPaths,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Groundcrew Website`,
        short_name: `Groundcrew`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-netlify-cms`,
  ],
}