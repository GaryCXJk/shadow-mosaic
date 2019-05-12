import { connect } from 'react-redux';
import Settings from '@pages/Settings';
import { CONFIG_SAVE } from '@store/actions/config';

const mapStateToProps = (state) => {
  const { config } = state;

  return {
    config,
  };
};

const mapDispatchToProps = dispatch => ({
  onSave: config => dispatch({
    type: CONFIG_SAVE,
    config,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
