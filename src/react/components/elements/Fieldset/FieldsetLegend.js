import React from 'react';
import PropTypes from 'prop-types';
import FieldsetLegendContainer from './FieldsetLegendContainer';
import FieldsetLegendText from './FieldsetLegendText';

const FieldsetLegend = ({ children }) => (
  <FieldsetLegendContainer>
    <FieldsetLegendText>{children}</FieldsetLegendText>
  </FieldsetLegendContainer>
);

FieldsetLegend.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FieldsetLegend;
