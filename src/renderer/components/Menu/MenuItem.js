import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Icon from '@elements/Icon';
import MenuButton from './MenuButton';

const MenuItem = ({
  onSelect,
  active,
  message,
  defaultMessage,
  icon,
  children,
}) => (
  <MenuButton onClick={onSelect} onMouseEnter={onSelect} className={active ? 'active' : ''}>
    {icon && <Icon icon={icon} />}
    <FormattedMessage id={message} defaultMessage={defaultMessage} />
    { children }
  </MenuButton>
);

MenuItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
  ]),
  children: PropTypes.node,
};

MenuItem.defaultProps = {
  defaultMessage: '',
  icon: false,
  children: null,
};

export default MenuItem;
