import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    display: block;
    position: absolute;

    button {
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 5px 15px 5px 0;
      color: ${theme.colors.darkGray};
      border: none;
      background-color: #fff;
      font-size: 100%;
      font-weight: bold;

      /* flex para alinhar conteúdo*/
      display: flex;
      justify-content: center;
      align-items: center;
    }

    section {
      display: none;
      width: 100%;
      max-width: 300px;

      .sub {
        display: none;
        background-color: #eee;
      }

      .subsub {
        display: none;
        background-color: #d6d6d6;
      }
    }

    div {
      opacity: 0.8;
      background-color: #fff;

      a {
        cursor: pointer;
        padding: 5px;
        color: ${theme.colors.darkGray};
      }

      a.subcategory {
        vertical-align: middle;
      }
    }
  `}
`;
