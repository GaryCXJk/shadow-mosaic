import styled from 'styled-components';
import propsFilter from '@hoc/propsFilter';

const FlexContainerBase = propsFilter('div', [
  'inline',
  'direction',
  'width',
  'height',
]);

const FlexContainer = styled(FlexContainerBase)`
${({
    inline,
    direction,
    width,
    height,
  }) => `
display: ${inline ? 'inline-' : ''}flex;
${direction ? `flex-direction: ${direction};` : ''}
${width ? `width: ${width};` : ''}
${height ? `height: ${height};` : ''}
`}
`;

export default FlexContainer;
