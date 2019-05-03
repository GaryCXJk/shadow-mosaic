import styled from 'styled-components';

const MenuBar = styled.div`
${({ theme }) => `
-webkit-user-select: none;
color: ${theme.textColor};
background-color: ${theme.menu.backgroundColor};
display: flex;
align-items: stretch;
font-size: 12px;
position: relative;
`}
`;

export default MenuBar;
