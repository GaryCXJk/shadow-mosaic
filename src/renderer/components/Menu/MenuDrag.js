import styled from 'styled-components';

const MenuDrag = styled.div`
${({ isVisible }) => `
-webkit-app-region: drag;
display: ${isVisible ? 'block' : 'none'};
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: -1;
`}
`;

export default MenuDrag;
