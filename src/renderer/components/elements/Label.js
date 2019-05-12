import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const merge = require('deepmerge');

const Label = ({ children, style, ...props }) => {
  const combinedStyle = merge({
    padding: '10px 0 5px',
  }, style);
  return (
    children ? (
      <Message style={combinedStyle} {...props}>
        {children}
      </Message>
    ) : <Message style={combinedStyle} {...props} />);
};

Label.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.node,
};

Label.defaultProps = {
  style: {},
  children: null,
};

export default Label;
