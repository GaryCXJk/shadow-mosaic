import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import { FormattedMessage } from 'react-intl';
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
    this.onClose = this.onClose.bind(this);
    this.addItem = this.addItem.bind(this);
    this.window = remote.getCurrentWindow();

    this.lastClicked = null;
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('blur', this.onWindowClick);
    this.window.on('focus', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('blur', this.onWindowClick);
    this.window.off('focus', this.onWindowClick);
  }

  onWindowClick(event) {
    let { target } = event;
    while (target && target !== this.lastClicked) {
      target = target.parentNode;
    }
    if (target !== this.lastClicked) {
      this.onClose();
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
      this.setState({
        open: item,
      });
      this.lastClicked = event.target;
      event.target.blur();
      if (onChange) {
        onChange(!!item);
      }
    }
  }

  addItem(option) {
    const { prefix } = this.props;
    const { open } = this.state;
    const {
      id,
      defaultMessage,
      options = null,
      action = null,
    } = option;
    const { onToggleItem } = this;

    const fullId = prefix ? `${prefix}.${id}` : id;
    const active = id === open;
    const onSelect = event => onToggleItem(id, event);

    const children = [];

    if (options && active) {
      children.push(<MenuList key={`${fullId}._`} options={options} prefix={fullId} onClose={this.onClose} />);
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
          <FormattedMessage id={`menu.${fullId}`} defaultMessage={defaultMessage} />
        </MenuButton>
      );
    }

    return (
      <MenuItem
        key={fullId}
        onSelect={onSelect}
        message={`menu.${fullId}`}
        defaultMessage={defaultMessage}
        active={active}
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
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};

MenuList.defaultProps = {
  root: false,
  prefix: '',
  onChange: null,
  onClose: null,
};

export default MenuList;
