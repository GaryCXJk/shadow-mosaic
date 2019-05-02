import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = (state) => {
  return {
    locale: state.language,
  };
};

export default connect(mapStateToProps)(IntlProvider);
