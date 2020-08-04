module.exports = {
  siteMetadata: {
    siteTitle: 'cwza\'s technical blog',
    siteDescription: 'cwza\'s technical blog',
    siteImage: '/banner.png', // main image of the site for metadata
    siteUrl: 'https://gatsby-blog.cwza.vercel.app',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'cwza', // for example - 'Ivan Ganev'
    authorDescription: 'Software Developer, Love open source, Love technology', // short text about the author
    avatar: '/avatar.jpg',
    twitterSite: 'cwz0205a', // website account on twitter
    twitterCreator: 'cwz0205a', // creator account on twitter
    social: [
      {
        icon: `at`,
        url: `mailto:cwz0205a@mail.com`
      },
      {
        icon: `twitter`,
        url: `https://twitter.com/cwz0205a`
      },
      {
        icon: `github`,
        url: `https://github.com/cwza`
      },
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chronoblog Gatsby Theme`,
        short_name: `Chronoblog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-70916999-2'
      }
    }
  ]
};
