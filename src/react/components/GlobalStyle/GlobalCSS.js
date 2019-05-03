import { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
${({ theme }) => `
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  font-size: 16px;
  background-color: ${theme.backgroundColor};
  color: ${theme.textColor};
}

body {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;

  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
`}
`;

export default GlobalCSS;
