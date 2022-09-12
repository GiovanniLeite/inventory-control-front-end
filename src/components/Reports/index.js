import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import * as actions from '../../store/modules/auth/actions';
import generateReport from '../../utils/generateReport';

import Loading from '../../components/Loading';
import { Container } from './styled';
import CategorySelector from '../../components/CategorySelector';

export default function Reports() {
  const [type, setType] = useState('items');
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [onlyCars, setOnlyCars] = useState(false);
  const [hideSold, setHideSold] = useState(false);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get('/categories/category-list');
        setCategories(data);

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
    // eslint-disable-next-line
  }, [dispatch]);

  const handleCategory = (nameCategory, id, idParent, idParentParent) => {
    try {
      if (idParent === 0 && idParentParent === 0) {
        // clicked on a main category
        setCategory1(id);
        setCategory2(idParent);
        setCategory3(idParentParent);
      } else if (idParentParent === 0) {
        // clicked on a subcategory1 category
        setCategory1(idParent);
        setCategory2(id);
        setCategory3(idParentParent);
      } else {
        // clicked on a subcategory2 category
        setCategory1(idParentParent);
        setCategory2(idParent);
        setCategory3(id);
      }

      document.querySelector('#inputCatReport').value = nameCategory;
    } catch (err) {
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  const handleReport = async () => {
    try {
      setIsLoading(true);
      let response = {};

      if (category1 || category2 || category3) {
        // if selected some category
        response = await axios.get(
          `/items/categories/${category1}&${category2}&${category3}`,
        );
      } else {
        response = await axios.get('/items/');
      }

      let data = response.data;
      data.reverse();

      if (type === 'items') {
        data = data.filter((e) => e.is_item); // remove wishes
      }

      if (type === 'wishes') {
        data = data.filter((e) => !e.is_item); // remove items
      }

      if (onlyCars) {
        data = data.filter((e) => e.is_car);
      }

      if (hideSold) {
        data = data.filter((e) => !e.date_sale);
      }

      generateReport('Itens', data);

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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h3>Relatórios</h3>
      {!isLoading && get(categories[0], 'name', false) && (
        <>
          <form onSubmit={handleReport}>
            <label className="firstLabel" htmlFor="type">
              Tipo:
              <select id="type" onChange={(e) => setType(e.target.value)}>
                <option value="Items">Itens</option>
                <option value="wishes">Desejos</option>
              </select>
            </label>
            <div className="categoryReport">
              <CategorySelector
                categories={categories}
                handle={handleCategory}
              />
              <input
                type="text"
                className="inputCatReport"
                placeholder="Categoria"
                disabled
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="onlyCars"
                onChange={() =>
                  onlyCars ? setOnlyCars(false) : setOnlyCars(true)
                }
              />
              <label htmlFor="onlyCars">Apenas carros</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="hideSold"
                className="second"
                onChange={() =>
                  hideSold ? setHideSold(false) : setHideSold(true)
                }
              />
              <label htmlFor="hideSold">Ocultar vendidos</label>
            </div>
          </form>
          <button className="reportButton" onClick={handleReport}>
            Relatório
          </button>
        </>
      )}
    </Container>
  );
}
