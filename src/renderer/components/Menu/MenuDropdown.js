import styled from 'styled-components';

const MenuDropdown = styled.div`
${({ theme }) => `
position: absolute;
top: 100%;
left: 0;
color: ${theme.textColor};
background-color: ${theme.menu.backgroundColor};
border: 1px solid ${theme.menu.dropdown.borderColor};
display: flex;
flex-direction: column;
min-width: 100px;
box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.5);
`}
`;

export default MenuDropdown;
