import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Menus from '@pages/Menus';
import Routes from '@pages/Routes';
import configureStore from './store';
import GlobalStyle from './containers/GlobalStyle';
import Language from './containers/Language';
import PageContainer from './components/PageContainer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Language>
      <Router>
        <GlobalStyle>
          <Menus />
          <PageContainer>
            <Routes />
          </PageContainer>
        </GlobalStyle>
      </Router>
    </Language>
  </Provider>
);

export default App;
