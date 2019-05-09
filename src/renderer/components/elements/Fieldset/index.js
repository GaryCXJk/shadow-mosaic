import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import watchTheme from '@hoc/watchTheme';
import FieldsetBlock from './FieldsetBlock';
import FieldsetLegend from './FieldsetLegend';

const Fieldset = ({
  id,
  defaultMessage,
  message,
  children,
}) => (
  <FieldsetBlock>
    <FieldsetLegend>
      {id ? <FormattedMessage id={id} defaultMessage={defaultMessage} /> : message || defaultMessage || ''}
    </FieldsetLegend>
    {children}
  </FieldsetBlock>
);

Fieldset.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  defaultMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Fieldset.defaultProps = {
  id: null,
  message: '',
  defaultMessage: null,
};

export default watchTheme(Fieldset);
