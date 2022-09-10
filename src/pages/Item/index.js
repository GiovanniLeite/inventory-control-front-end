import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container, ItemDetails } from './styled';
import ItemContainer from '../../components/ItemContainer';

export default function Item({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [item, setItem] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/items/${id}`);
        setItem(data);
        const response = await axios.get(
          `/categories/${data.id_main_category}&${data.id_sub1_category}&${data.id_sub2_category}`,
        );
        setCategories(response.data);
        setIsLoading(false);
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

    getData();
  }, [id, history, dispatch]);

  document.title = `${get(item, 'name', false)} - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {get(item, 'name', false) && get(categories[0], 'name', false) && (
        <Container>
          <ItemDetails>
            <ul>
              <li>{`${categories[0].name} `}</li>
              {get(categories[1], 'name', false) && (
                <>
                  <li>{' > '}</li>
                  <li>{`${categories[1].name} `}</li>
                </>
              )}
              {get(categories[2], 'name', false) && (
                <>
                  <li>{' > '}</li>
                  <li>{`${categories[2].name} `}</li>
                </>
              )}
            </ul>
          </ItemDetails>
          <ItemContainer item={item} />
        </Container>
      )}
    </MainContainer>
  );
}

Item.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
