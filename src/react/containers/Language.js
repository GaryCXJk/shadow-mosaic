import { connect } from 'react-redux';
import { IntlProvider, defineMessages } from 'react-intl';
import intlMessages from '../locale';

const mapStateToProps = (state) => {
  const locale = intlMessages[state.config.language] ? state.config.language : 'en';
  const messages = defineMessages(intlMessages[locale]);

  return {
    locale,
    messages,
  };
};

export default connect(mapStateToProps)(IntlProvider);
