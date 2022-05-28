import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    //max-width: 96rem;
    width: 100%;
    font-size: ${theme.font.sizes.medium};
    margin: 0 auto;
    //padding: ${theme.spacings.medium};
  `}
`;
