import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Block from '@elements/Block';

const GridCellBase = ({ area: _area, children, ...props }) => (
  <Block {...props}>
    {children}
  </Block>
);

const GridCell = styled(GridCellBase)`
${({
    area,
  }) => `
${area ? `grid-area: ${area};` : ''}
`}
`;

GridCellBase.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node,
};

GridCellBase.defaultProps = {
  area: null,
  children: null,
};

export default GridCell;
