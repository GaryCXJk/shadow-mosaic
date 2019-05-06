import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuIconBase = ({ icon, ...props }) => (
  <div {...props}>
    {(icon !== true && icon) || ''}
  </div>
);

const MenuIcon = styled(MenuIconBase)`
width: 1em;
height: 1em;
display: inline-block;
vertical-align: middle;
`;

MenuIconBase.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
  ]),
};

MenuIconBase.defaultProps = {
  icon: false,
};

export default MenuIcon;
