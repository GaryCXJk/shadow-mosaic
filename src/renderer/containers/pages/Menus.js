import { connect } from 'react-redux';
import Menus from '@components/pages/Menus';

const mapStateToProps = (state) => {
  const { config } = state;
  const { theme: themeName } = config;

  return {
    themeName,
  };
};

export default connect(mapStateToProps)(Menus);
