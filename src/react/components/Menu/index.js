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
import MenuList from './MenuList';
import MenuButton from './MenuButton';
import MenuTitle from './MenuTitle';
import menu from '../../../constants/menu';

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
      open: false,
    };

    this.onResize = this.onResize.bind(this);
    this.onMenuChanged = this.onMenuChanged.bind(this);
  }

  componentDidMount() {
    remote.getCurrentWindow().on('resize', this.onResize);
  }

  componentWillUnmount() {
    remote.getCurrentWindow().off('resize', this.onResize);
  }

  onMenuChanged(value) {
    this.setState({
      open: value,
    });
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
        <MenuList options={menu} onChange={this.onMenuChanged} root />
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
