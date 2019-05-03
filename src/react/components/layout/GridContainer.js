import styled from 'styled-components';

const GridContainer = styled.div`
${({
    inline,
    rows,
    columns,
    areas,
    width,
    height,
  }) => `
display: ${inline ? 'inline-' : ''}grid;
grid-template-rows: ${rows || 'auto'};
grid-template-columns: ${columns || 'auto'};
${areas ? `grid-template-areas: ${Array.isArray(areas) ? `"${areas.join('" "')}"` : areas};
${width ? `width: ${width};` : ''}
${height ? `height: ${height};` : ''}
` : ''}
`}
`;

export default GridContainer;
