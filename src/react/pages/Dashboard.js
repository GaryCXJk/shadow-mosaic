import React from 'react';
import GridContainer from '../components/layout/GridContainer';
import GridCell from '../components/layout/GridCell';

const Dashboard = () => (
  <GridContainer
    columns="50% 50%"
    rows="auto 1fr"
    areas={['header header', 'left right']}
    height="100%"
  >
    <GridCell area="header">Test</GridCell>
    <GridCell area="left">Left</GridCell>
    <GridCell area="right">Right</GridCell>
  </GridContainer>
);

export default Dashboard;
