import { connect } from 'react-redux';
import Settings from '@pages/Settings';

const mapStateToProps = state => state.config;

export default connect(mapStateToProps)(Settings);
