import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';

const DropdownListStyle = styled.div`
${({ theme }) => `
background-color: ${theme.form.input.backgroundColor};
border-left: 1px solid ${theme.form.input.borderColor};
border-right: 1px solid ${theme.form.input.borderColor};
border-bottom: 1px solid ${theme.form.input.borderColor};
min-height: 5px;
position: absolute;
top: 100%;
left: 0;
right: 0;
z-index: 10;
font-size: 12px;
max-height: 100px;
overflow: auto;
`}
`;

class DropdownList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };

    this.getItem = this.getItem.bind(this);
  }

  onClick(value) {
    const { onClick, value: propValue } = this.props;

    if (onClick) {
      onClick(value);
    } else if (typeof propValue === 'undefined') {
      this.setState({
        value,
      });
    }
  }

  getItem(option) {
    const { value: propValue } = this.props;
    const { value: stateValue } = this.state;
    const { value, messageId, defaultMessage } = option;

    const isSelected = (typeof propValue !== 'undefined' ? propValue : stateValue) === value;

    const onClick = () => { this.onClick(value); };

    return (
      <DropdownItem
        key={messageId}
        onClick={onClick}
        active={isSelected}
        messageId={messageId}
        defaultMessage={defaultMessage}
      />
    );
  }

  render() {
    const { options } = this.props;

    const items = options.map(this.getItem);

    return (
      <DropdownListStyle>
        {items}
      </DropdownListStyle>
    );
  }
}

DropdownList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    messageId: PropTypes.string,
    defaultMessage: PropTypes.string,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

DropdownList.defaultProps = {
  value: null,
  onClick: null,
};

export default DropdownList;
