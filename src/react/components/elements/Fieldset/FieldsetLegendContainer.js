import styled from 'styled-components';

const FieldsetLegendContainer = styled.div`
${({ theme }) => `
position: absolute;
left: 0;
right: 0;
top: 0;
display: flex;

&::before, &::after {
  content: '';
  border-top: 1px solid ${theme.fieldset.borderColor || theme.borderColor};
}

&::before {
  width: 15px;
  margin-right: 5px;
}

&::after {
  flex: 1 0 0;
  margin-left: 5px;
}
`}
`;

export default FieldsetLegendContainer;
