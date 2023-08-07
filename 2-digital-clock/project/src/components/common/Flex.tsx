import styled, { css } from 'styled-components';

const Flex = styled.div<{
  $column?: boolean;
  $justifyCenter?: boolean;
  $alignCenter?: boolean;
}>`
  display: flex;
  ${({ $column, $justifyCenter, $alignCenter }) => css`
    ${$column && {
      flexDirection: 'column',
    }}
    ${$justifyCenter && {
      justifyContent: 'center',
    }}
    ${$alignCenter && {
      alignItems: 'center',
    }}
  `}
`;

export default Flex;
