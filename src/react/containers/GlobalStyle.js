import { connect } from 'react-redux';
import GlobalStyle from '@components/GlobalStyle';
import * as themes from '@themes';
import defaultTheme from '@themes/default';

const mapStateToProps = (state) => {
  const { config } = state;
  const { theme: themeName } = config;

  const theme = themes[themeName] || defaultTheme;

  return {
    theme,
  };
};

export default connect(mapStateToProps)(GlobalStyle);
