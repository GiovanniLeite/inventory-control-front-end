/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    div#categoryBar {
      padding: ${theme.spacings.small} ${theme.spacings.large};
      box-shadow: 0 0 5px #000;
      height: 50px;

      button.categorySelector {
        font-weight: 400;
      }

      ul#ulSortBy {
        padding-top: 4px;
        float: right;
        list-style: none;
        font-size: 100%;
      }

      li#liSortBy {
        span {
          vertical-align: middle;
        }

        ul {
          display: none;
          position: absolute;
          background-color: ${theme.colors.white};
          list-style: none;
          min-width: 140px;
          padding: 5px;
        }

        a {
          cursor: pointer;
          text-decoration: none;
          color: ${theme.colors.darkGray};
        }

        &:hover {
          opacity: 0.8;

          ul {
            display: block;
          }
        }
      }
    }

    div#searchBar {
      form {
        width: 100%;
        padding: ${theme.spacings.small} ${theme.spacings.large} 0
          ${theme.spacings.large};

        input {
          width: 100%;
          padding: ${theme.spacings.superSmall};
        }

        @media only screen and (max-width: 1200px) {
          padding: ${theme.spacings.small};
        }
      }
    }

    div#containerItem {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(20%, 20%));
      padding: 25px;

      @media only screen and (max-width: 1200px) {
        padding: 15px;
        padding-top: 0;
      }

      @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(auto-fill, minmax(33%, 33%));
      }

      @media only screen and (max-width: 600px) {
        grid-template-columns: 50% 50%;
      }
    }
  `}
`;

export const Pagination = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 25px;

    div {
      margin: 0 auto;
      width: 205px;
      overflow: hidden;
      display: flex;
    }

    button {
      cursor: pointer;
      padding: 5px;
      color: ${theme.colors.gold};
      background-color: ${theme.colors.black};
      border: none;
      font-size: 100%;
      width: 100px;
      box-shadow: 0 0 10px #666;

      * flex para alinhar conteúdo *
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        opacity: 0.9;
      }
    }

    button:disabled {
      opacity: 0.4;
      color: ${theme.colors.white};
    }

    button + button {
      margin-left: 5px;
    }
  `}
`;
