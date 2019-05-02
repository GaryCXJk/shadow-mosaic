import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Menu from './components/Menu';
import GlobalStyle from './containers/GlobalStyle';
import store from './store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle>
        <Menu />
        Hello Happy World!
      </GlobalStyle>
    </BrowserRouter>
  </Provider>
);

export default App;
