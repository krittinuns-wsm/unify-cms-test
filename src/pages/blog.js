import React from 'react'
//import Link from 'gatsby-link'
//import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import ArticlePreview from '../components/article-preview'
import {StaticQuery, graphql} from 'gatsby'
import Layout from '../components/layout'

class BlogIndex extends React.Component {
  render() {
    return (
      <StaticQuery
        query={pageQuery}
        render={data => (
          <Layout>
            <div style={{ background: '#fff' }}>
              <Helmet title={data.site.siteMetadata.title} />
              <div className={styles.hero}>
                Blog
              </div>
              <div className="wrapper">
                <h2 className="section-headline">Recent articles</h2>
                <ul className="article-list">
                  {data.allContentfulBlogPost.edges.map(({ node }) => {
                    return (
                      <li key={node.slug}>
                        <ArticlePreview article={node} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </Layout>
        )}
      />
    ); 
  }
}

export default BlogIndex;

const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

