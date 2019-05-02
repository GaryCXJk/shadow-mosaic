import styled from 'styled-components';

const MenuItem = styled.button`
${({ theme }) => `
-webkit-app-region: no-drag;
padding: 2px 6px;
border: none;
background: none;
color: ${theme.menu.textColor || theme.textColor};

&:hover {
  background-color: ${theme.menu.item.hover.backgroundColor};
  color: ${theme.menu.item.textColor || theme.menu.item.hover.textColor || theme.menu.textColor || theme.textColor};
}
&:focus, &:active {
  background-color: ${theme.menu.item.focus.backgroundColor};
  color: ${theme.menu.item.textColor || theme.menu.item.focus.textColor || theme.menu.textColor || theme.textColor};
}

outline: none;
`}
`;

export default MenuItem;
