import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Block from '@elements/Block';

const MessageBase = ({
  id,
  defaultMessage,
  fontSize: _fontSize,
  inline: _inline,
  ...props
}) => (
  <Block {...props}>
    <FormattedMessage id={id} defaultMessage={defaultMessage} />
  </Block>
);

const Message = styled(MessageBase)`
${({
    fontSize,
    inline,
  }) => `
font-size: ${fontSize};
${inline ? 'display: inline-block;' : ''}
`}
`;

MessageBase.propTypes = {
  id: PropTypes.string,
  defaultMessage: PropTypes.string,
  fontSize: PropTypes.string,
  inline: PropTypes.bool,
};

MessageBase.defaultProps = {
  id: '',
  defaultMessage: '',
  fontSize: '12px',
  inline: false,
};

export default Message;
