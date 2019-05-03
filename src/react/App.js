import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Menu from './components/Menu';
import GlobalStyle from './containers/GlobalStyle';
import Language from './containers/Language';
import store from './store';
import PageContainer from './components/PageContainer';
import Routes from './pages/Routes';

const App = () => (
  <Provider store={store}>
    <Language>
      <BrowserRouter>
        <GlobalStyle>
          <Menu />
          <PageContainer>
            <Routes />
          </PageContainer>
        </GlobalStyle>
      </BrowserRouter>
    </Language>
  </Provider>
);

export default App;
