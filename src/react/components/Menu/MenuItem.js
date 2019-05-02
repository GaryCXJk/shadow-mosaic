import styled from 'styled-components';

const MenuItem = styled.button`
${({ theme }) => `
-webkit-app-region: no-drag;
padding: 2px 6px;
border: none;
background: none;

&:hover {
  background-color: ${theme.menu.item.hover.backgroundColor};
}
&:focus, &:active {
  background-color: ${theme.menu.item.focus.backgroundColor};
}

outline: none;
`}
`;

export default MenuItem;
