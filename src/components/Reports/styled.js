import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};

    h3 {
      text-align: center;
      margin-bottom: 15px;
      font-weight: bold;
    }

    form {
      display: grid;
      grid-template-columns: 50% 50%;
      padding: ${theme.spacings.small};

      .second {
        margin-left: ${theme.spacings.small};

        button.categorySelector {
          font-weight: 400;
        }
      }

      @media only screen and (max-width: 500px) {
        grid-template-columns: 100%;

        .second {
          margin-left: 0;
        }
      }
    }

    form > div {
      margin-bottom: ${theme.spacings.small};

      label {
        padding-left: 5px;
      }
    }

    label {
      min-width: 150px;
      padding-top: 5px;
    }

    select,
    input[type='text'] {
      margin: 5px 0;
      height: 40px;
      width: 100%;
      padding: 0 10px;
      border: 1px solid #ddd;

      &:hover {
        border-color: ${({ theme }) => theme.colors.black};
      }
    }

    input#inputCatReport {
      margin-top: 34px;
    }

    button.report {
      cursor: pointer;
      display: block;
      padding: 10px 15px;
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
      border: none;
      margin: 0 auto;

      &:hover {
        color: ${theme.colors.gold};
        opacity: 1;
      }
    }
  `}
`;
