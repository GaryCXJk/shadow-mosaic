import styled from 'styled-components';

const MenuButton = styled.span`
${({ theme }) => `
-webkit-app-region: no-drag;
padding: 2px 6px;
border: none;
background: none;
display: inline-block;
position: relative;
color: ${theme.menu.textColor || theme.textColor};

&:hover {
  background-color: ${theme.menu.item.hover.backgroundColor};
  color: ${theme.menu.item.textColor || theme.menu.item.hover.textColor || theme.menu.textColor || theme.textColor};
}
&.active {
  background-color: ${theme.menu.item.focus.backgroundColor};
  color: ${theme.menu.item.textColor || theme.menu.item.focus.textColor || theme.menu.textColor || theme.textColor};
}
outline: none;
`}
`;

export default MenuButton;
