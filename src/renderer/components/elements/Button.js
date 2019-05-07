import styled from 'styled-components';

const Button = styled.button`
${({ theme }) => `
border: none;
padding: 8px 10px;
background-color: ${theme.button.backgroundColor};
color: ${theme.button.textColor};

&:hover {
  background-color: ${theme.button.hover.backgroundColor};
  color: ${theme.button.hover.textColor};
}
&:focus, &:active {
  background-color: ${theme.button.focus.backgroundColor};
  color: ${theme.button.focus.textColor};
}

outline: none;
`}
`;

export default Button;
