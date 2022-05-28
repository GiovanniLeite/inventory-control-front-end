/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const CategoryBar = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small} ${theme.spacings.large} ${theme.spacings.small} 0;
    box-shadow: 0 0 5px #000;
    height: 50px;
  `}
`;

export const SortByUl = styled.ul`
  margin: 0;
  padding-top: 5px;
  float: right;
  list-style: none;
`;

export const SortByLi = styled.li`
  ${({ theme }) => css`
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

    &&:hover {
      opacity: 0.8;
    }

    &&:hover ul {
      display: block;
    }
  `}
`;

export const SearchBar = styled.div`
  ${({ theme }) => css`
    form {
      width: 100%;
      padding: ${theme.spacings.small} ${theme.spacings.large} 0 ${theme.spacings.large};
      height: 60px;

      input {
        width: 100%;
        padding: ${theme.spacings.verySmall};
      }
    }
  `}
`;

export const ContainerItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 2fr));
  padding: 25px;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 50% 50%;
  }
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

      /* flex para alinhar conteúdo */
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
