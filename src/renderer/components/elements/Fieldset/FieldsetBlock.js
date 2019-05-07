import styled from 'styled-components';

const FieldsetBlock = styled.div`
${({ theme }) => `
margin-top: 8px;
margin-bottom: 8px;
padding: 14px 15px;
border-top-width: 0;
border-left-width: 1px;
border-right-width: 1px;
border-bottom-width: 1px;
border-style: solid;
border-color: ${theme.fieldset.borderColor || theme.borderColor};
position: relative;
`}
`;

export default FieldsetBlock;
