import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    transition: opacity 300ms ease-in-out;
    padding: ${theme.spacings.small};

    &:hover {
      box-shadow: 0 0 10px #666;
    }

    @media only screen and (max-width: 574px) {
      box-shadow: 0 0 10px #666;
      margin: 5px;
    }
  `}
`;

export const PostCardCover = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.small};

  img {
    width: 100%;
    display: block;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const PostCardHeading = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};

    a {
      color: ${theme.colors.darkGray};
    }
  `}
`;

export const PostCardCategory = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};

    a {
      color: ${theme.colors.darkGray};
    }
  `}
`;
