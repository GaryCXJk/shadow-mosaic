import React from 'react';
import Fieldset from '@elements/Fieldset';
import GridContainer from '@layout/GridContainer';
import GridCell from '@layout/GridCell';

const Dashboard = () => (
  <GridContainer
    columns="50% 50%"
    rows="auto 1fr"
    areas={['header header', 'left right']}
    height="100%"
  >
    <GridCell
      area="header"
      style={{
        padding: '15px',
      }}
    >
      Test
    </GridCell>
    <GridCell
      area="left"
      style={{
        padding: '15px',
      }}
    >
      <Fieldset id="dashboard.recent_projects" defaultMessage="Recent projects">
        Left
      </Fieldset>
    </GridCell>
    <GridCell
      area="right"
      style={{
        padding: '15px',
      }}
    >
      Right
    </GridCell>
  </GridContainer>
);

export default Dashboard;
