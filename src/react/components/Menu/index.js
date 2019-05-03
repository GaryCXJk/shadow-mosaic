import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import {
  FiMaximize,
  FiMinimize,
  FiMinus,
  FiX,
} from 'react-icons/fi';
import MenuBar from './MenuBar';
import MenuDrag from './MenuDrag';
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';
import MenuTitle from './MenuTitle';

const maximizeApp = () => {
  const currentWindow = remote.getCurrentWindow();
  if (currentWindow.isMaximized()) {
    currentWindow.unmaximize();
  } else {
    currentWindow.maximize();
  }
};

const minimizeApp = () => {
  remote.getCurrentWindow().minimize();
};

const closeApp = () => {
  remote.getCurrentWindow().close();
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
    };

    this.onToggleFile = this.onToggleItem.bind(this, 'file');
    this.onToggleHelp = this.onToggleItem.bind(this, 'help');
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

  render() {
    const { open } = this.state;

    const isMaximized = remote.getCurrentWindow().isMaximized();

    return (
      <MenuBar>
        <MenuDrag isVisible={!open} />
        <MenuItem onSelect={this.onToggleFile} active={open === 'file'} message="menu.file" defaultMessage="File" />
        <MenuItem onSelect={this.onToggleHelp} active={open === 'help'} message="menu.help" defaultMessage="Help" />
        <MenuTitle>Shadow Mosaic</MenuTitle>
        <MenuButton onClick={minimizeApp}><FiMinus /></MenuButton>
        <MenuButton onClick={maximizeApp}>
          {isMaximized ? <FiMinimize /> : <FiMaximize />}
        </MenuButton>
        <MenuButton onClick={closeApp}><FiX /></MenuButton>
      </MenuBar>
    );
  }
}

export default Menu;
