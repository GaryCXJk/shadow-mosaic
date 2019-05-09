import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { config } = state;
  const { theme: themeName } = config;

  return {
    themeName,
  };
};

const watchTheme = ThemedComponent => connect(mapStateToProps)(ThemedComponent);

export default watchTheme;
