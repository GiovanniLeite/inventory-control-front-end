import styled from 'styled-components';

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 10px #666;

  h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 500px) {
    padding: 15px;
    margin: 8px;
  }
`;

export const Form = styled.form`
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
      border-color: ${({ theme }) => theme.colors.black};
    }
  }

  input#inputCat {
    margin-top: 35px;
  }

  button#save {
    cursor: pointer;
    border: none;
    padding: 10px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.gold};
      box-shadow: 0 0 10px #666;
    }
  }
`;
