/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */



//console.log('WPGRAPHQL_URL:', process.env.WPGRAPHQL_URL);
module.exports = {
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
  siteMetadata: {
    title: `Paa website`,
    description: `そのPさんのウェブサイト`,
    lang: `ja`,
    //siteUrl: `https://paa.ac`,
    siteUrl: `http://cms.mathi.jp/paa`,
    locale: `ja_JP`,
    fbappid: `XXXXXXXXXXXXXXXXXXXXX`,
  },
  plugins: [
    //{
    //  resolve: `gatsby-plugin-env-variables`,
    //  options: {
    //    allowList: ["WPGRAPHQL_URL", "GATSBY_CONTENT_SYNC_URL"],
    //  },
    //},
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `http://cms.mathi.jp/paa/graphql`,

      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Noto Sans JP`,
            file: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap`,
          },
        ],
      },
    },
    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/images/`,
      },
    },
    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Paa`,
        short_name: `Paa`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#c9171e`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: 'NetworkFirst',
            },
          ],
        },
      },
    }
  ],
}
