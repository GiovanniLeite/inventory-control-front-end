/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import axios from '../../services/axios';
import api_url from '../../config/api';
import * as actions from '../../store/modules/auth/actions';

import { CategorySelect } from '../../styles/global-styles';
import CategoryMobile from '../../components/CategoryMobile';
import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, CategoryBar, SortByUl, SortByLi, SearchBar, ContainerItem, Pagination } from './styles';
import PostCard from '../../components/PostCard';
import { assembleCategoriesUl } from '../../utils/assemble-categories-ul';

export default function Home() {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]); // current list of items
  const [fullListItems, setFullListItems] = useState([]); // full list of items
  const [numberOfPages, setNumberOfPages] = useState(1); //number of pages
  const maxItemsAllowed = 15; // maximum items allowed
  const [currentPage, setCurrentPage] = useState(1); // current page

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [remountCount, setRemountCount] = useState(0);
  const refresh = () => setRemountCount(remountCount + 1);

  async function handleCategory(nameCategory, id, idParent, idParentParent) {
    try {
      let idMainCategory;
      let idSub1Category;
      let idSub2Category;

      if (idParent === 0 && idParentParent === 0) {
        // clicked on a main category
        idMainCategory = id;
        idSub1Category = idParent;
        idSub2Category = idParentParent;
      } else if (idParentParent === 0) {
        // clicked on a subcategory1 category
        idMainCategory = idParent;
        idSub1Category = id;
        idSub2Category = idParentParent;
      } else {
        // clicked on a subcategory2 category
        idMainCategory = idParentParent;
        idSub1Category = idParent;
        idSub2Category = id;
      }

      let { data } = await axios.get(`/items/categories/${idMainCategory}&${idSub1Category}&${idSub2Category}`);
      data = data.filter((e) => e.is_item); // remove wishes

      pagination(data);
    } catch (err) {
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  function pagination(data) {
    if (data.length > maxItemsAllowed) {
      let a = data.length / maxItemsAllowed;
      setNumberOfPages(Math.ceil(a));
      setFullListItems(data);
      setItems(data.slice(0, maxItemsAllowed));
    } else {
      setNumberOfPages(1);
      setFullListItems([]);
      setItems(data);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        let response = await axios.get('/items/');
        response = response.data.filter((e) => e.is_item); // remove wishes

        pagination(response);
        const { data } = await axios.get('/categories/category-list');
        setCategories(data);

        const handleResizeWindowCat = () => {
          const menu = document.getElementById('categoryM');
          const windowWidth = window.innerWidth;
          // eslint-disable-next-line
          windowWidth > 700 && (menu && (menu.style.display = 'none'));
        };
        // to prevent the menu from being open
        window.addEventListener('resize', handleResizeWindowCat);

        setIsLoading(false);

        document.querySelector('#liCat').appendChild(assembleCategoriesUl(0, data, handleCategory));
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const data = get(err, 'response.data', {});
        const errors = get(data, 'errors', []);
        console.log(err);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        if (status === 401) dispatch(actions.loginFailure());
      }
    }

    getData();
    // eslint-disable-next-line
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!search.match(/[a-zA-Z]+/gi)) {
        // only numbers
        const { data } = await axios.get(`/items/${search}`); // return object
        setItems([data]); // [{}]
        setNumberOfPages(1);
        setFullListItems([data]);
      } else {
        // string
        let { data } = await axios.get(`/items/name/${String(search)}`); // return array
        data = data.filter((el) => el.is_item); // remove wishes

        pagination(data);
      }

      setIsLoading(false);
      document.querySelector('#liCat').appendChild(assembleCategoriesUl(0, categories, handleCategory));
    } catch (err) {
      setIsLoading(false);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  function handlePreviousNext(e, isNext) {
    e.preventDefault();

    if (isNext) {
      const nextPage = currentPage + 1;
      const end = nextPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage + 1);
    } else {
      const previousPage = currentPage - 1;
      const end = previousPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage - 1);
    }
    refresh();
  }

  async function handleOrder(e, order) {
    e.preventDefault();

    switch (order) {
      case 'Az': {
        // eslint-disable-next-line no-nested-ternary
        const response = items.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setItems(response);
        refresh();
        break;
      }
      case 'Za': {
        // eslint-disable-next-line no-nested-ternary
        const response = items.sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
        setItems(response);
        refresh();
        break;
      }
      case 'id': {
        // eslint-disable-next-line no-nested-ternary
        const response = items.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
        setItems(response);
        refresh();
        break;
      }
      default:
        break;
    }
  }

  document.title = 'Home - Inventory';

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {get(categories[0], 'name', false) && (
        <Container>
          <CategoryBar>
            <CategorySelect style={{ float: 'left' }}>
              <ul>
                <li id="liCat">
                  Categorias
                  <span>
                    <FaAngleDown />
                  </span>
                </li>
              </ul>
            </CategorySelect>
            <CategoryMobile categories={categories} handle={handleCategory} />
            <SortByUl>
              <SortByLi>
                Classificar por
                <span>
                  <FaAngleDown />
                </span>
                <ul>
                  <li>
                    <Link to="/" onClick={(e) => handleOrder(e, 'Az')}>
                      Ordem A-Z
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={(e) => handleOrder(e, 'Za')}>
                      Ordem Z-A
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={(e) => handleOrder(e, 'id')}>
                      Código
                    </Link>
                  </li>
                </ul>
              </SortByLi>
            </SortByUl>
          </CategoryBar>
          <SearchBar>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procure por nome ou código"
              />
            </form>
          </SearchBar>
          <ContainerItem>
            {items.map((item) => (
              <PostCard
                key={item.id}
                cover={
                  get(item, 'FotoVideos[0].url', false)
                    ? item.FotoVideos[0].url
                    : `${api_url}/images/no-image.jpg`
                }
                slug={String(item.id)}
                brand={item.brand}
                title={item.name}
              />
            ))}
          </ContainerItem>
          {numberOfPages > 1 && (
            <Pagination>
              <div>
                {(currentPage > 1 && (
                  <button onClick={(e) => handlePreviousNext(e, false)} title="Anterior">
                    <MdNavigateBefore /> Anterior
                  </button>
                )) || (
                  <button title="Não existe página anterior" disabled>
                    <MdNavigateBefore /> Anterior
                  </button>
                )}
                {(currentPage < numberOfPages && (
                  <button onClick={(e) => handlePreviousNext(e, true)} title="Próximo">
                    Próximo <MdNavigateNext />
                  </button>
                )) || (
                  <button title="Não existe próxima página" disabled>
                    Próximo <MdNavigateNext />
                  </button>
                )}
              </div>
            </Pagination>
          )}
        </Container>
      )}
    </MainContainer>
  );
}
