import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './containers/GlobalStyle';
import Language from './containers/Language';
import store from './store';
import PageContainer from './components/PageContainer';
import Menus from './pages/Menus';
import Routes from './pages/Routes';

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
