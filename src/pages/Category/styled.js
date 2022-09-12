import styled, { css } from 'styled-components';

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
    }

    form {
      label {
        font-weight: bold;
      }

      input {
        margin: 10px 0;
        height: 40px;
        width: 100%;
        padding: 0 10px;
        border: 1px solid #ddd;

        &:hover {
          border-color: ${theme.colors.black};
        }
      }

      input.inputCat {
        margin-top: 35px;
      }

      button.saveCategory {
        cursor: pointer;
        border: none;
        padding: 10px;
        width: 100%;
        color: ${theme.colors.white};
        background-color: ${theme.colors.black};

        &:hover,
        &:focus {
          color: ${theme.colors.gold};
          box-shadow: 0 0 10px #666;
        }
      }
    }
  `}
`;
