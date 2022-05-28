import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    display: none;
    margin-left: 5px;
    position: absolute;
    //margin-bottom: 40px;

    button {
      padding: 5px;
      color: ${theme.colors.darkGray};
      border: none;
      background-color: #fff;
      font-size: 100%;
      font-weight: 100;
      //height: 40px;

      /* flex para alinhar conteúdo*/
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    section {
      display: none;
    }

    @media only screen and (max-width: 700px) {
      display: block;
    }
  `}
`;

export const CategoryM = styled.div`
  width: 100%;
  max-width: 300px;

  .main {
  }

  .sub {
    display: none;
    background-color: #eee;
  }

  .subsub {
    display: none;
    background-color: #d6d6d6;
  }
`;

export const Category = styled.div`
  ${({ theme }) => css`
    opacity: 0.8;
    background-color: #fff;

    a {
      padding: 5px;
      color: ${theme.colors.darkGray};
    }

    a:hover {
      cursor: pointer;
    }

    a.subcategory {
      vertical-align: middle;
    }
  `}
`;
