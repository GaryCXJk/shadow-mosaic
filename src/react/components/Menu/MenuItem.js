import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuButton from './MenuButton';

const MenuItem = ({
  onSelect,
  active,
  message,
  defaultMessage,
  children,
}) => (
  <MenuButton onClick={onSelect} onMouseEnter={onSelect} className={active ? 'active' : ''}>
    <FormattedMessage id={message} defaultMessage={defaultMessage} />
    { children }
  </MenuButton>
);

MenuItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  children: PropTypes.node,
};

MenuItem.defaultProps = {
  defaultMessage: '',
  children: null,
};

export default MenuItem;
