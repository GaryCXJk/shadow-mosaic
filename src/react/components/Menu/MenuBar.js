import styled from 'styled-components';

const MenuBar = styled.div`
${({ theme }) => `
-webkit-app-region: drag;
color: ${theme.textColor};
background-color: ${theme.menu.backgroundColor};
display: flex;
align-items: stretch;
font-size: 12px;
`}
`;

export default MenuBar;
