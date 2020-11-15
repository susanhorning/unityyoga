const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()));
    return Promise.reject(result.errors);
  }
  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach((edge) => {
    if (!edge.node.frontmatter.templateKey) return;
    const id = edge.node.id;
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
      context: {
        id,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
