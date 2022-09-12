import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  ${({ theme }) => css`
    max-width: 480px;
    background: #fff;
    margin: 20px auto;
    padding: 30px;
    box-shadow: 0 0 10px #666;

    @media only screen and (max-width: 500px) {
      padding: 15px;
      margin: 8px;
    }

    h2 {
      text-align: center;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    div.categoryList {
      margin-top: 20px;

      div {
        display: grid;
        grid-template-columns: 13% 61% 13% 13%;
        align-items: center;
        padding: 5px 0;
        text-align: center;

        @media only screen and (max-width: 330px) {
          grid-template-columns: 13% 57% 15% 15%;
        }

        section.arrowDown {
          padding: 10px;
        }

        a {
          cursor: pointer;
          padding: 5px 10px;
          color: ${theme.colors.white};
          background-color: ${theme.colors.black};
          box-shadow: 0 0 10px #666;
          border-radius: 3px;

          &:hover {
            color: ${theme.colors.gold};
            opacity: 0.9;
          }
        }
      }
      // main category
      div.main {
        background-color: #eee;
      }

      // subcategory lvl 1
      div.sub1 {
        display: none;
        background-color: #d6d6d6;
      }

      // subcategory lvl 2
      div.sub2 {
        display: none;
        background-color: #b0b0b0;
      }

      div + div {
        border-top: 1px solid #333;
      }
    }
  `}
`;

export const NewCategory = styled(Link)`
  ${({ theme }) => css`
    display: block;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    color: ${theme.colors.gold};
    background-color: ${theme.colors.black};
    box-shadow: 0 0 10px #666;

    &:hover,
    &:focus {
      opacity: 0.9;
    }
  `}
`;
