import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalCSS from './GlobalCSS';

const GlobalStyle = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalCSS />
      { children }
    </Fragment>
  </ThemeProvider>
);

GlobalStyle.propTypes = {
  theme: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
};

export default GlobalStyle;
