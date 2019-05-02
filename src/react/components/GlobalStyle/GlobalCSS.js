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
  color: ${theme.color};
}

body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
}
`}
`;

export default GlobalCSS;
