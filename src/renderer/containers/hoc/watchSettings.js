import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { config } = state;

  return {
    ...config,
  };
};

const watchSettings = WatchComponent => connect(mapStateToProps)(WatchComponent);

export default watchSettings;
