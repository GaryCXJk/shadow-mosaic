import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import watchSettings from '@hoc/watchSettings';
import DropdownContainer from './DropdownContainer';
import DropdownInput from './DropdownInput';
import DropdownList from './DropdownList';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    const { open } = this.state;
    this.setState({
      open: !open,
      value: null,
    });
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  onChange(value) {
    const { onChange, value: propValue } = this.props;

    if (onChange) {
      onChange(value);
    } else if (typeof propValue === 'undefined') {
      this.setState({
        value,
      });
    }
    this.setState({
      open: false,
    });
  }

  getValue() {
    const { value: propValue } = this.props;
    const { value: stateValue } = this.state;

    return (typeof propValue !== 'undefined' ? propValue : stateValue);
  }

  getSelected() {
    const { options } = this.props;
    const value = this.getValue();

    for (let optionsIndex = 0; optionsIndex < options.length; optionsIndex += 1) {
      const option = options[optionsIndex];
      if (option.value === value) {
        return option;
      }
    }

    return null;
  }

  render() {
    const { open } = this.state;
    const { options } = this.props;

    const value = this.getValue();

    const selected = this.getSelected();

    return (
      <DropdownContainer>
        <DropdownInput onClick={this.onClick} className={open ? 'active' : ''}>
          {selected ? (
            <FormattedMessage
              id={selected.messageId}
              defaultMessage={selected.defaultMessage}
            />
          ) : ''}
        </DropdownInput>
        {open ? (
          <DropdownList
            options={options}
            value={value}
            onClick={this.onChange}
          />
        ) : ''}
      </DropdownContainer>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    messageId: PropTypes.string,
    defaultMessage: PropTypes.string,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  value: null,
  onChange: null,
};

export default watchSettings(Dropdown);
