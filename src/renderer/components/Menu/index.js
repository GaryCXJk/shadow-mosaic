import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  FiMaximize,
  FiMinimize,
  FiMinus,
  FiX,
} from 'react-icons/fi';
import WindowManager from 'common/helpers/WindowManager';
import MenuBar from './MenuBar';
import MenuDrag from './MenuDrag';
import MenuList from './MenuList';
import MenuButton from './MenuButton';
import MenuTitle from './MenuTitle';

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
    this.onWindowClose = this.onWindowClose.bind(this);
    this.onMenuChanged = this.onMenuChanged.bind(this);
    this.onMinimize = this.onMinimize.bind(this);
    this.onMaximize = this.onMaximize.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    const { window: w } = this.props;
    const currentWindow = WindowManager.get(w);
    currentWindow.on('resize', this.onResize);
    currentWindow.on('close', this.onWindowClose);
  }

  componentWillUnmount() {
    this.onWindowClose();
  }

  onWindowClose() {
    const { window: w } = this.props;
    const currentWindow = WindowManager.get(w);
    currentWindow.off('resize', this.onResize);
    currentWindow.off('close', this.onWindowClose);
  }

  onMenuChanged(value) {
    this.setState({
      open: value,
    });
  }

  onResize() {
    this.forceUpdate();
  }

  onMinimize() {
    const { window: w } = this.props;
    WindowManager.get(w).minimize();
  }

  /**
   * Triggered when the current window is maximized.
   */
  onMaximize() {
    const { window: w } = this.props;
    const currentWindow = WindowManager.get(w);
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
  }

  onClose() {
    const { window: w, onClose } = this.props;
    WindowManager.get(w).close();
    if (onClose) {
      onClose();
    }
  }

  render() {
    const {
      menu,
      title,
      titleId,
      canMinimalize,
      canMaximize,
      window: w,
    } = this.props;
    const { open } = this.state;

    const currentWindow = WindowManager.get(w);
    const isMaximized = currentWindow.isMaximized();
    const maximize = canMaximize && currentWindow.isResizable();

    return (
      <MenuBar>
        <MenuDrag isVisible={!open} />
        {menu ? <MenuList options={menu} onChange={this.onMenuChanged} root /> : ''}
        <MenuTitle>{titleId ? <FormattedMessage id={titleId} defaultMessage={title || ''} /> : title || ''}</MenuTitle>
        {canMinimalize ? <MenuButton onClick={this.onMinimize}><FiMinus /></MenuButton> : ''}
        {maximize ? (
          <MenuButton onClick={this.onMaximize}>
            {isMaximized ? <FiMinimize /> : <FiMaximize />}
          </MenuButton>
        ) : ''}
        <MenuButton onClick={this.onClose}><FiX /></MenuButton>
      </MenuBar>
    );
  }
}

Menu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  title: PropTypes.string,
  titleId: PropTypes.string,
  window: PropTypes.string,
  onClose: PropTypes.func,
  canMinimalize: PropTypes.bool,
  canMaximize: PropTypes.bool,
};

Menu.defaultProps = {
  menu: null,
  title: '',
  titleId: '',
  window: '',
  onClose: null,
  canMinimalize: true,
  canMaximize: true,
};

export default Menu;
