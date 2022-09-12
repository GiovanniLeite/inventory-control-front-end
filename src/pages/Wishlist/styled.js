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

      @media only screen and (max-width: 400px) {
        font-size: ${theme.font.sizes.large};
      }
    }

    div.wishList {
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

        div.picture {
          img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            box-shadow: 0 0 10px #666;
          }
        }

        a {
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

      div + div {
        border-top: 1px solid #333;
      }
    }
  `}
`;

export const NewWish = styled(Link)`
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
