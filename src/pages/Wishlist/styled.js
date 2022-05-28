import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 480px;
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 10px #666;

  h1 {
    text-align: center;
    margin-bottom: 10px;
    letter-spacing: 1px;

    @media only screen and (max-width: 400px) {
      font-size: ${({ theme }) => theme.font.sizes.large};
    }
  }

  @media only screen and (max-width: 500px) {
    padding: 15px;
    margin: 8px;
  }
`;

export const ContainerZ = styled.div`
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

    a {
      padding: 5px 10px;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.black};
      box-shadow: 0 0 10px #666;
      border-radius: 3px;

      &:hover {
        color: ${({ theme }) => theme.colors.gold};
        opacity: 0.9;
      }
    }
  }

  div + div {
    border-top: 1px solid #333;
  }
`;

export const Picture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    box-shadow: 0 0 10px #666;
  }
`;

export const New = styled(Link)`
  display: block;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.gold};
  background-color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 0 10px #666;

  &:hover,
  &:focus {
    opacity: 0.9;
  }
`;
