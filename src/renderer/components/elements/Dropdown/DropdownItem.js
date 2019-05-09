import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';
import Icon from '@elements/Icon';

const DropdownItemBase = ({
  active,
  messageId,
  defaultMessage,
  className,
  ...props
}) => {
  const classNames = [];
  if (className) {
    classNames.push(className);
  }
  if (active) {
    classNames.push('active');
  }
  return (
    <div className={classNames.join(' ')} {...props}>
      <Icon icon={active ? <FiChevronRight /> : true} />
      <FormattedMessage id={messageId} defaultMessage={defaultMessage} />
    </div>
  );
};

const DropdownItem = styled(DropdownItemBase)`
${({ theme }) => `
padding: 5px 15px;
background-color: ${theme.form.input.backgroundColor};
color: ${theme.form.input.textColor};

&:hover {
  background-color: ${theme.form.input.hover.backgroundColor};
}

&.active {
  background-color: ${theme.form.input.focus.backgroundColor};
}
`}
`;

DropdownItemBase.propTypes = {
  active: PropTypes.bool,
  messageId: PropTypes.string,
  defaultMessage: PropTypes.string,
  className: PropTypes.string,
};

DropdownItemBase.defaultProps = {
  active: false,
  messageId: '',
  defaultMessage: '',
  className: '',
};

export default DropdownItem;
