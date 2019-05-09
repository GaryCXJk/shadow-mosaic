import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconBase = ({ icon, ...props }) => (
  <div {...props}>
    {(icon !== true && icon) || ''}
  </div>
);

const Icon = styled(IconBase)`
width: 1em;
height: 1em;
display: inline-block;
text-align: center;
vertical-align: middle;
margin-right: 4px;
`;

IconBase.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
  ]),
};

IconBase.defaultProps = {
  icon: false,
};

export default Icon;
