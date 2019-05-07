import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyleHelper from '@helpers/StyleHelper';

const BlockBase = ({ style: _style, children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

const Block = styled(BlockBase)`
${({ style }) => StyleHelper.convertStyleAttribute(style)}
`;

BlockBase.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.node,
};

BlockBase.defaultProps = {
  style: {},
  children: null,
};

export default Block;
