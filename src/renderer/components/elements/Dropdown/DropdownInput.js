import styled from 'styled-components';

const DropdownInput = styled.div`
${({ theme }) => `
padding: 10px 15px;
background-color: ${theme.form.input.backgroundColor};
color: ${theme.form.input.textColor};
border: 1px solid ${theme.form.input.borderColor};

&:hover {
  background-color: ${theme.form.input.hover.backgroundColor};
}

&.active {
  background-color: ${theme.form.input.focus.backgroundColor};
}
`}
`;

export default DropdownInput;
