import styled from 'styled-components';

const MenuDivider = styled.hr`
${({ theme }) => `
border-width: 1px;
border-color: ${theme.menu.dropdown.borderColor};
width: 100%;
`}
`;

export default MenuDivider;
