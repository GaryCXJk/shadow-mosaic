import styled from 'styled-components';

const FlexContainer = styled.div`
${({
    inline,
    direction,
  }) => `
display: ${inline ? 'inline-' : ''}flex;
${direction ? `flex-direction: ${direction};` : ''}
`}
`;

export default FlexContainer;
