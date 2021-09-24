import React from "react";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";

const Header = ({headerIntro}) => {
  const headerStyle = `
  text-3xl
  text-gray-700
  font-medium
  border-black
  border-b-2
  py-5
  `
  return (
  <div className={headerStyle}>{headerIntro}</div>
  )
}
const HomePage = ({ data: { allPosts, site, blog }}) => {
  const cardTitle = `
  font-bold
  text-4xl
  `
  return (
    <Container>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <Header headerIntro="The quick Git cookbook for developers in a pinch" />
      {allPosts.nodes.map(node => (
        <article key={node.id}>
          <h2 className={cardTitle}>{node.title}</h2>
          <p>{node.intro}</p>
        </article>
      ))}
    </Container>
  )
}

export default HomePage

export const query = graphql`
  query {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allPosts: allDatoCmsRecipe {
      nodes {
        title
        id
        intro
      }
    }
  }
`