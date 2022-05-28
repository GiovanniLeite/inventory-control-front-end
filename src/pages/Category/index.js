/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { FaAngleDown } from 'react-icons/fa';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { CategorySelect } from '../../styles/global-styles';
import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, Form } from './styled';
import { assembleCategoriesUl } from '../../utils/assemble-categories-ul';

export default function Category({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [idParent, setIdParent] = useState(0);
  const [idParentParent, setIdParentParent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategory = (nameCategory, idClicked, idParentZ, idParentParentZ) => {
    if (idParentParentZ !== 0) {
      toast.error('Categorias devem ter apenas três níveis');
    } else if (id) {
      // if edit
      const idZ = parseInt(id, 10);

      if (idClicked === idZ) {
        toast.error('Categoria Selecionada deve ser diferente da atual');
      } else if (idParentZ === idZ || idParentParentZ === idZ) {
        toast.error('Categoria Selecionada não pode ser Subcategoria da atual');
      } else {
        setIdParent(idClicked);
        setIdParentParent(idParentZ);
      }
    } else {
      // if new category
      setIdParent(idClicked);
      setIdParentParent(idParentZ);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        //const { data } = await axios.get(`/categories/`);
        const { data } = await axios.get('/categories/category-list');
        setCategories(data);

        if (!id) {
          setIsLoading(false);
          document.querySelector('#li').appendChild(assembleCategoriesUl(0, data, handleCategory));
          return;
        }

        const responseCat = data.filter((e) => e.id === Number(id));
        setName(responseCat[0].name);
        setIdParent(responseCat[0].id_parent);
        setIdParentParent(responseCat[0].id_parent_parent);

        setIsLoading(false);
        // Main categories cannot become Subcategories
        if (!(responseCat[0].id_parent === 0 && responseCat[0].id_parent_parent === 0)) {
          document.querySelector('#li').appendChild(assembleCategoriesUl(0, data, handleCategory));
        }
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
    // eslint-disable-next-line
  }, [id, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
      document.getElementById('name').style.borderColor = '#ff0000';
    }

    const idParentZ = document.getElementById('inputCat').value;
    if (idParent === '') {
      toast.error('Categoria não selecionada');
      formErrors = true;
      document.getElementById('inputCat').style.borderColor = '#ff0000';
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/categories/${id}`, {
          name,
          id_parent: idParent,
          id_parent_parent: idParentParent,
        });
        toast.success('Categoria editada com sucesso!');
        //const { data } = await axios.get(`/categories/`);
        const { data } = await axios.get('/categories/category-list');
        setIsLoading(false);
        if (!(idParent === 0 && idParentParent === 0)) {
          document.querySelector('#li').appendChild(assembleCategoriesUl(0, data, handleCategory));
        }
      } else {
        const { data } = await axios.post(`/categories/`, {
          name,
          id_parent: idParentZ,
          id_parent_parent: idParentParent,
        });
        toast.success('Categoria criada com sucesso!');
        history.push(`/category/${data.id}/edit`);
      }
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  document.title = `${name} - Inventory`;

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        {!isLoading && (
          <>
            <h1>{id ? 'Editar Categoria' : 'Nova Categoria'}</h1>

            <Form onSubmit={handleSubmit}>
              <label htmlFor="name">
                *Nome:
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome da categoria"
                />
              </label>

              <CategorySelect>
                <ul>
                  <li
                    id="li"
                    title={
                      idParent === 0 && idParentParent === 0
                        ? 'Categorias principais não podem se tornar subcategorias'
                        : 'Categoria Superior'
                    }
                    style={{ textAlign: 'left' }}
                  >
                    <strong>*Categoria:</strong>
                    <span>
                      <FaAngleDown />
                    </span>
                  </li>
                </ul>
                <input id="inputCat" type="number" disabled="disabled" value={idParent} placeholder="Id da categoria" />
              </CategorySelect>

              <button type="submit" id="save">
                Enviar
              </button>
              <button type="button" id="loading">
                Carregando ...
              </button>
            </Form>
          </>
        )}
      </Container>
    </MainContainer>
  );
}

Category.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
