import React, { Component } from 'react';
import DropdownContainer from './DropdownContainer';
import DropdownInput from './DropdownInput';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;

    return (
      <DropdownContainer>
        <DropdownInput onClick={this.onClick} className={open ? 'active' : ''}>Test</DropdownInput>
      </DropdownContainer>
    );
  }
}

export default Dropdown;
