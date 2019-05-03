import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import MenuItem from './MenuItem';

class MenuDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
    };

    this.onWindowClick = this.onWindowClick.bind(this);
    this.onResize = this.onResize.bind(this);

    this.lastClicked = null;
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('blur', this.onWindowClick);
    remote.getCurrentWindow().on('focus', this.onWindowClick);
    remote.getCurrentWindow().on('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('blur', this.onWindowClick);
    remote.getCurrentWindow().off('focus', this.onWindowClick);
    remote.getCurrentWindow().off('resize', this.onResize);
  }

  onWindowClick(event) {
    let { target } = event;
    while (target && target !== this.lastClicked) {
      target = target.parentNode;
    }
    if (target !== this.lastClicked) {
      this.setState({
        open: null,
      });
    }
  }

  onToggleItem(item, event) {
    const { open } = this.state;
    if (event.type !== 'mouseenter' || open) {
      this.setState({
        open: item,
      });
      this.lastClicked = event.target;
      event.target.blur();
    }
  }

  onResize() {
    this.forceUpdate();
  }

  addItem(option) {
    const { prefix } = this.props;
    const { id, defaultMessage } = option;

    const fullId = prefix ? `${prefix}.${id}` : id;
    const onToggleItem = this.onToggleItem.bind(this, id);

    return (
      <MenuItem
        key={fullId}
        onSelect={onToggleItem}
        message={`menu.${fullId}`}
        defaultMessage={defaultMessage}
      />
    );
  }

  render() {
    const { root, options } = this.props;

    const RootElement = root ? Fragment : 'div';

    const items = options.map(this.addItem);

    return (
      <RootElement>
        {items}
      </RootElement>
    );
  }
}

MenuDropdown.propTypes = {
  root: PropTypes.bool,
  prefix: PropTypes.string,
};

MenuDropdown.defaultProps = {
  root: false,
  prefix: '',
};

export default MenuDropdown;
