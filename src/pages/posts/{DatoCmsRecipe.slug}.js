import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import Header from "../../components/header";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";

export default function Post({ data: { site, post } }) {
  return (
    <Container>
      <HelmetDatoCms seo={post.seo} favicon={site.favicon} />
      <Header />
      <article>
      <PostBody content={post.content} />
        {/* <PostHeader
          title={post.title}
          // coverImage={post.coverImage}
          date={post.date}
          // author={post.author}
        />
         */}
      </article>
      <SectionSeparator />
      {/* {morePosts.nodes.length > 0 && <MoreStories posts={morePosts.nodes} />} */}
    </Container>
  );
}

export const query = graphql`
  query PostBySlug($id: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsRecipe(id: {eq: $id}) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      content {
        value
      }
      date
    }
  }
`
// export const query = graphql`
//   query PostBySlug($id: String) {
//     site: datoCmsSite {
//       favicon: faviconMetaTags {
//         ...GatsbyDatoCmsFaviconMetaTags
//       }
//     }
//   }
// `;
// export const query = graphql`
//   query PostBySlug {
//     site: datoCmsSite {
//       favicon: faviconMetaTags {
//         ...GatsbyDatoCmsFaviconMetaTags
//       }
//     }
//   }
// `;

const fy = `
recipe(id: { eq: $id }) {
  seo: seoMetaTags {
    ...GatsbyDatoCmsSeoMetaTags
  }
  title
  slug
  content {
    value
    blocks {
      __typename
      ... on DatoCmsImageBlock {
        id: originalId
        image {
          fluid(
            imgixParams: { fm: "jpg" }
            sizes: "(max-width: 700) 100vw, 700px"
          ) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
  date
}
`
