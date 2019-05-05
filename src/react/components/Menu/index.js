import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import WindowManager from '../../helpers/WindowManager';

/**
 * Maximizes the current window screen.
 */
const maximizeApp = () => {
  const currentWindow = WindowManager.get('main');
  if (currentWindow.isMaximized()) {
    currentWindow.unmaximize();
  } else {
    currentWindow.maximize();
  }
};

const minimizeApp = () => {
  WindowManager.get('main').minimize();
};

const closeApp = () => {
  WindowManager.get('main').close();
};

/**
 * Creates a Menu.
 */
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
    WindowManager.get('main').on('resize', this.onResize);
  }

  componentWillUnmount() {
    WindowManager.get('main').off('resize', this.onResize);
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
    const { menu } = this.props;
    const { open } = this.state;

    const isMaximized = WindowManager.get('main').isMaximized();

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

Menu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default Menu;
