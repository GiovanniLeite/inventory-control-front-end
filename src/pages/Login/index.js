import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, Form } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const history = get(props, 'history');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
      document.getElementById('email').style.borderColor = '#ff0000';
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
      document.getElementById('password').style.borderColor = '#ff0000';
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath, history }));
  };

  document.title = `Login - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Container>
          <h1>Login</h1>

          <Form onSubmit={handleSubmit}>
            <label htmlFor="email">
              *Email:
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
              />
            </label>
            <label htmlFor="password">
              *Senha:
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </label>
            <button type="submit" id="save">
              Acessar
            </button>
            <button type="button" id="loading">
              Carregando ...
            </button>
          </Form>
        </Container>
      )}
    </MainContainer>
  );
}
