import styled from 'styled-components';

export const Container = styled.div`
  max-width: 480px;
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 10px #666;

  @media only screen and (max-width: 500px) {
    padding: 15px;
    margin: 8px;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 280px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${({ theme }) => theme.colors.darkGray};
    margin: 30px auto;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 280px;
      height: 180px;
    }
  }

  input {
    display: none;
  }
`;
