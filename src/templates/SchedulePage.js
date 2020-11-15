import React from 'react';

import Layout from '../components/Layout';
import { graphql } from 'gatsby';

export const SchedulePageTemplate = ({ title }) => (
  <main className="main-content wide">
    <h1 className="main-heading">{title}</h1>
    <div className="desktop-only">
      <iframe
        frameBorder="0"
        height="100"
        src="https://app.punchpass.com/embed/8932/iframe_buttons"
        title="Unity Yoga PunchPass buttons"
        width="100%"
      />
      <iframe
        frameBorder="0"
        height="1400"
        src="https://app.punchpass.com/org/8932/calendar?embed=true"
        title="Unity Yoga PunchPass calendar"
        width="100%"
      />
    </div>
    <div className="schedule-row">
      <div className="schedule-column">
        <iframe
          frameBorder="0"
          height="860"
          src="https://app.punchpass.com/org/8932/passes?embed=true"
          title="Unity Yoga buy PunchPass passes"
          width="100%"
        />
      </div>
      <div className="schedule-column">
        <iframe
          frameBorder="0"
          height="860"
          src="https://app.punchpass.com/org/8932/classes?embed=true"
          title="Unity Yoga PunchPass class list"
          width="100%"
        />
      </div>
    </div>
  </main>
);
const SchedulePage = ({
  data: {
    markdownRemark: {
      frontmatter: { description, title },
    },
  },
}) => {
  return (
    <Layout description={description} title={title} withNav>
      {' '}
      <SchedulePageTemplate title={title} />{' '}
    </Layout>
  );
};

export default SchedulePage;

export const schedulePageQuery = graphql`
  query schedulePageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "SchedulePage" } }) {
      frontmatter {
        description
        title
      }
    }
  }
`;
