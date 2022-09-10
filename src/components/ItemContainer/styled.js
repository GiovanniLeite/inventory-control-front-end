import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const Container = styled.div`
  ${({ theme }) => css`
    overflow: hidden;
    min-height: 200px;
    width: 100%;
    padding: 1.5rem};
    background-color: ${theme.colors.gold};
    margin: 0 auto;
    box-shadow: 0 0 10px #666;

    @media only screen and (max-width: 930px) {
      padding: ${theme.spacings.small};
    }
  `}
`;

export const ContainerDuo = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 60% 40%;

    @media only screen and (max-width: 850px) {
      grid-template-columns: 100%;
      gap: ${theme.spacings.small};
    }

    div {
      width: 100%;
    }

    div#images {
      padding-right: 10px;

      @media only screen and (max-width: 850px) {
        padding-right: 0;
      }

      div#contentCarousel {
        background-color: ${theme.colors.white};
        box-shadow: 0 0 10px #666;

        h1 {
          display: none;
        }

        img {
          width: 100%;
        }

        ul {
          list-style: none;
          text-align: center;
          padding: 10px 10px 20px 10px;
        }

        ul li {
          display: inline-block;
          margin-left: 3px;
        }

        ul li a {
          cursor: pointer;
          text-decoration: none;
          padding: 5px 10px;
          color: ${theme.colors.white};
          background-color: ${theme.colors.black};
          box-shadow: 0 0 7px #666;
          border-radius: 3px;

          &:hover {
            color: ${theme.colors.gold};
            opacity: 1;
          }
        }

        @media only screen and (max-width: 1150px) {
          div > div.embla {
            padding: ${theme.spacings.small};
            padding-right: 0;
          }
        }

        @media only screen and (max-width: 850px) {
          padding: ${theme.spacings.superSmall};

          h1 {
            display: block;
            font-size: 140%;
            text-align: center;
            padding: 2px;
          }

          div > div.embla {
            max-width: none;
          }

          ul {
            padding: 10px 10px 10px 10px;
          }
        }

        @media only screen and (max-width: 460px) {
          h1 {
            font-size: 110%;
          }
        }
      }
    }

    div#data {
      background-color: ${theme.colors.white};
      padding: ${theme.spacings.medium};
      box-shadow: 0 0 10px #666;

      @media only screen and (max-width: 1150px) {
        padding: ${theme.spacings.small};
      }

      @media only screen and (max-width: 900px) {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      @media only screen and (max-width: 850px) {
        padding: ${theme.spacings.small};
      }

      h1 {
        margin-bottom: ${theme.spacings.medium};
        text-align: center;

        @media only screen and (max-width: 1080px) {
          margin-bottom: ${theme.spacings.small};
        }

        @media only screen and (max-width: 1000px) {
          font-size: 20px;
        }

        @media only screen and (max-width: 900px) {
          margin-bottom: 5px;
        }

        @media only screen and (max-width: 850px) {
          display: none;
        }
      }

      div {
        display: grid;
        grid-template-columns: 50% 50%;

        label {
          font-size: 14px;
          background-color: #eee;
          margin: 1px;
          padding: 3px;
        }

        label h5 {
          font-size: 18px;
        }

        @media only screen and (max-width: 1070px) {
          label h5 {
            font-size: 14px;
          }
        }
      }
    }
  `}
`;

export const ContainerDescription = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
    background-color: ${theme.colors.white};
    box-shadow: 0 0 10px #666;
    margin-top: ${theme.spacings.small};

    label {
      font-weight: bold;
    }

    p {
      text-align: justify;
      font-weight: 400;
      padding: ${theme.spacings.small};
    }

    @media only screen and (max-width: 1150px) {
      padding: ${theme.spacings.small};
    }

    @media only screen and (max-width: 700px) {
      padding: ${theme.spacings.superSmall};

      p {
        font-size: 14px;
      }
    }
  `}
`;

export const DialogRel = styled(Dialog)`
  ${({ theme }) => css`
    .MuiPaper-root {
      border-radius: 0;
    }

    button.close {
      cursor: pointer;
      padding: 3px 3px 0 3px;
      color: ${theme.colors.gold};
      background-color: ${theme.colors.black};
      border: none;
      font-size: 100%;
      vertical-align: middle;
      box-shadow: 0 0 10px #666;

      &:hover {
        opacity: 0.9;
      }
    }
  `}
`;
