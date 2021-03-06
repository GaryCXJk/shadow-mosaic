import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Icon from '@elements/Icon';
import WindowManager from '@helpers/WindowManager';
import MenuDivider from './MenuDivider';
import MenuDropdown from './MenuDropdown';
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
    };

    this.onWindowClick = this.onWindowClick.bind(this);
    this.onToggleItem = this.onToggleItem.bind(this);
    this.onWindowClose = this.onWindowClose.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addItem = this.addItem.bind(this);

    this.lastClicked = null;
  }

  componentDidMount() {
    const { window: w } = this.props;
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('blur', this.onWindowClick);
    if (w) {
      WindowManager.on(w, 'focus', this.onWindowClick);
      WindowManager.on(w, 'close', this.onWindowClose);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('blur', this.onWindowClick);
    this.onWindowClose();
  }

  onWindowClick(event = {}) {
    let { target } = event;
    while (target && target !== this.lastClicked) {
      target = target.parentNode;
    }
    if (target !== this.lastClicked) {
      this.onClose();
    }
  }

  onWindowClose() {
    const { window: w } = this.props;
    if (w) {
      WindowManager.off(w, 'focus', this.onWindowClick);
      WindowManager.off(w, 'close', this.onWindowClose);
    }
  }

  onClose() {
    const { onChange, onClose } = this.props;
    this.setState({
      open: null,
    });
    if (onChange) {
      onChange(false);
    }
    if (onClose) {
      onClose();
    }
  }

  onToggleItem(item, event) {
    const { onChange } = this.props;
    const { open } = this.state;
    if (event.type !== 'mouseenter' || open) {
      const openState = (event.type === 'mouseenter' || open !== item) && item;
      this.setState({
        open: openState,
      });
      this.lastClicked = event.target;
      if (onChange) {
        onChange(!!item);
      }
    }
  }

  addItem(option, index) {
    const { prefix } = this.props;
    const { open } = this.state;
    const {
      type = null,
      id = null,
      messageId = null,
      defaultMessage = null,
      options = null,
      action = null,
      location = null,
      icon = null,
    } = option;

    const w = option.window || '';
    const { onToggleItem } = this;

    const fullId = prefix ? `${prefix}.${id || `dv_${index}`}` : id || `dv_${index}`;
    if (type === 'divider') {
      return <MenuDivider key={fullId} />;
    }
    const active = id === open;
    const onSelect = event => onToggleItem(id, event);

    const children = [];

    if (options && active) {
      const realOptions = (options && {}.toString.call(options) === '[object Function]' ? options() : options);
      children.push(<MenuList key={`${fullId}._`} options={realOptions} prefix={fullId} onClose={this.onClose} window={w} />);
    }

    if (action) {
      const fullAction = () => {
        this.setState({
          open: null,
        });
        this.lastClicked = null;
        action();
      };
      return (
        <MenuButton key={fullId} onClick={fullAction}>
          {icon && <Icon icon={icon} />}
          <FormattedMessage id={messageId || `menu.${fullId}`} defaultMessage={defaultMessage} />
        </MenuButton>
      );
    }

    if (location) {
      return (
        <Link key={fullId} to={location}>
          <FormattedMessage id={messageId || `menu.${fullId}`} defaultMessage={defaultMessage} />
        </Link>
      );
    }

    return (
      <MenuItem
        key={fullId}
        onSelect={onSelect}
        message={messageId || `menu.${fullId}`}
        defaultMessage={defaultMessage}
        active={active}
        icon={icon}
      >
        {children}
      </MenuItem>
    );
  }

  render() {
    const { root, options } = this.props;

    const RootElement = root ? Fragment : MenuDropdown;

    const items = options.map(this.addItem);

    return (
      <RootElement>
        {items}
      </RootElement>
    );
  }
}

MenuList.propTypes = {
  root: PropTypes.bool,
  prefix: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  window: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};

MenuList.defaultProps = {
  root: false,
  prefix: '',
  window: '',
  onChange: null,
  onClose: null,
};

export default MenuList;
