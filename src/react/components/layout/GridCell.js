import styled from 'styled-components';

const GridCell = styled.div`
${({
    area,
  }) => `
${area ? `grid-area: ${area};` : ''}
`}
`;

export default GridCell;
