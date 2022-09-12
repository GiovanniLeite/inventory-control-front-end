import styled, { createGlobalStyle, css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';

export const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: ${theme.font.sizes.medium};

    .Toastify .Toastify__toast-container .Toastify__toast--success,
    .Toastify .Toastify__toast-container .Toastify__toast--warning,
    .Toastify .Toastify__toast-container .Toastify__toast--error {
      background: ${theme.colors.black};
      border-radius: 0;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--success {
      color: #00ff00;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--warning {
      color: #daa520;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--error {
      color: #ff0000;
    }
  }

  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }
`}
`;

export const ModifiedDialog = styled(Dialog)`
  ${({ theme }) => css`
    .MuiPaper-root {
      border-radius: 0;
    }

    h3 {
      margin: 15px;
      margin-bottom: 5px;
      text-align: center;
    }

    span {
      border-bottom: 1px solid #333;
      width: 150px;
      margin: 0 auto;
    }

    h5 {
      text-align: center;
      padding: 10px 15px;
    }

    .MuiDialogActions-root {
      align-items: center;
    }

    button {
      cursor: pointer;
      text-decoration: none;
      padding: 5px 5px 5px 5px;
      color: ${theme.colors.gold};
      background-color: ${theme.colors.black};
      border: none;
      box-shadow: 0 0 10px #666;

      &:hover {
        opacity: 0.9;
      }
    }
  `}
`;
