import styled, { css } from 'styled-components';

export const Container = styled.section`
  max-width: 120rem;
  margin: 0 auto;
`;

export const ItemDetails = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    padding-left: 0;
    font-size: ${theme.font.sizes.small};
    font-weight: bold;

    ul {
      vertical-align: middle;
    }

    li {
      display: inline-block;
      margin-left: 5px;
      color: ${theme.colors.darkGray};
    }
  `}
`;
