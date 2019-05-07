import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Block from '@elements/Block';

const GridContainerBase = ({
  inline: _inline,
  rows: _rows,
  columns: _columns,
  areas: _areas,
  width: _width,
  height: _height,
  children,
  ...props
}) => (
  <Block {...props}>
    {children}
  </Block>
);

const GridContainer = styled(GridContainerBase)`
${({
    inline,
    rows,
    columns,
    areas,
    width,
    height,
  }) => `
display: ${inline ? 'inline-' : ''}grid;
grid-template-rows: ${rows || 'auto'};
grid-template-columns: ${columns || 'auto'};
${areas ? `grid-template-areas: ${Array.isArray(areas) ? `"${areas.join('" "')}"` : areas};
${width ? `width: ${width};` : ''}
${height ? `height: ${height};` : ''}
` : ''}
`}
`;

GridContainerBase.propTypes = {
  inline: PropTypes.bool,
  rows: PropTypes.string,
  columns: PropTypes.string,
  areas: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.string,
    ),
    PropTypes.string,
  ]),
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};

GridContainerBase.defaultProps = {
  inline: false,
  rows: null,
  columns: null,
  areas: null,
  width: null,
  height: null,
  children: null,
};

export default GridContainer;
