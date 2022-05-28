import styled from 'styled-components';

export const Container = styled.div`
  max-width: 120rem;
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 10px #666;

  h1 {
    text-align: center;
  }

  @media only screen and (max-width: 1250px) {
    margin: 20px;
  }

  @media only screen and (max-width: 700px) {
    padding: 5px;
    margin: 8px;
  }
`;

export const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    max-width: 60%;

    @media only screen and (max-width: 700px) {
      max-width: 95%;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #000;
    background: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Form = styled.form`
  margin-top: 20px;

  div#divForm {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 5px;

    @media only screen and (max-width: 700px) {
      grid-template-columns: 100%;
    }
  }

  label {
    font-weight: bold;
  }

  input,
  select {
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
    @media only screen and (max-width: 700px) {
      margin-top: 40px;
    }
  }

  textarea {
    height: 300px;
    width: 100%;
    margin-top: 5px;
    resize: none;
    padding: 5px;

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.black};
    }

    @media only screen and (max-width: 700px) {
      height: 150px;
    }
  }

  button[type='submit'] {
    border: none;
    padding: 10px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
    display: block;
    width: 100%;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.gold};
      box-shadow: 0 0 10px #666;
      cursor: pointer;
    }
  }
`;
