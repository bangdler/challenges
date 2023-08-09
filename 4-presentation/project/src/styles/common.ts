import { css } from 'styled-components';

const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexColumnCenter = css`
  ${FlexRowCenter};
  flex-direction: column;
`;

export { FlexRowCenter, FlexColumnCenter };
