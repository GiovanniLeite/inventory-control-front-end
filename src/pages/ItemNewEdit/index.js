import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaAngleDown, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { get } from 'lodash';
import CurrencyInput from 'react-currency-input-field';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { CategorySelect } from '../../styles/global-styles';
import CategoryMobile from '../../components/CategoryMobile';
import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, Picture, Form } from './styled';
import { assembleCategoriesUl } from '../../utils/assemble-categories-ul';
import api_url from '../../config/api';

export default function ItemNewEdit({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const isWish = get(match, 'params.isWish', '');

  const [name, setName] = useState('');
  const [km, setKm] = useState('');
  const [other, setOther] = useState('');
  const [brand, setBrand] = useState('');
  const [dateRelease, setDateRelease] = useState('');
  const [newUsed, setNewUsed] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [countryManufactury, setCountryManufactury] = useState('');
  const [datePurchase, setDatePurchase] = useState('');
  const [dateSale, setDateSale] = useState('');
  const [pricePurchase, setPricePurchase] = useState('');
  const [priceSale, setPriceSale] = useState('');
  const [priceMy, setPriceMy] = useState('');
  const [isCar, setIsCar] = useState(false);
  const [isItem, setIsItem] = useState(!isWish);
  const [description, setDescription] = useState('');
  const [idMainCategory, setIdMainCategory] = useState(0);
  const [idSub1Category, setIdSub1Category] = useState(0);
  const [idSub2Category, setIdSub2Category] = useState(0);
  const [idCat, setIdCat] = useState(0);
  const [fotoVideo, setFotoVideo] = useState('');

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function handleCategory(nameCategory, idClicked, idParent, idParentParent) {
    if (idParent === 0 && idParentParent === 0) {
      // clicked on a main category
      setIdMainCategory(idClicked);
      setIdSub1Category(idParent);
      setIdSub2Category(idParentParent);
    } else if (idParentParent === 0) {
      // clicked on a subcategory1 category
      setIdMainCategory(idParent);
      setIdSub1Category(idClicked);
      setIdSub2Category(idParentParent);
    } else {
      // clicked on a subcategory2 category
      setIdMainCategory(idParentParent);
      setIdSub1Category(idParent);
      setIdSub2Category(idClicked);
    }
    // show the correct id on inputCat
    setIdCat(idClicked);

    const inputCategory = document.getElementById('inputCat');
    inputCategory.value = nameCategory;
  }

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        //const response = await axios.get(`/categories/`);
        const response = await axios.get('/categories/category-list');
        setCategories(response.data);

        if (!id) {
          /* START clears all form fields if the user is coming from editing to the new */
          setFotoVideo('');
          setName('');
          setKm('');
          setOther('');
          setBrand('');
          setDateRelease('');
          setNewUsed('');
          setCustomCode('');
          setQuantity('');
          setCountryManufactury('');
          setDatePurchase('');
          setDateSale('');
          setPricePurchase('');
          setPriceSale('');
          setPriceMy('');
          setIsCar(false);
          setIsItem(!isWish);
          setDescription('');
          setIdMainCategory(0);
          setIdSub1Category(0);
          setIdSub2Category(0);
          setIdCat(0);
          /* END clears all form fields if the user is coming from editing to the new */

          setIsLoading(false);
          document.querySelector('#li').appendChild(assembleCategoriesUl(0, response.data, handleCategory));

          return;
        }

        const { data } = await axios.get(`/items/${id}`);
        const elem = get(data, 'FotoVideos[0].url', '');

        setFotoVideo(elem);

        setName(data.name);
        setKm(data.km);
        setOther(data.other);
        setBrand(data.brand);
        setDateRelease(data.date_release);
        setNewUsed(data.new);
        setCustomCode(data.custom_code);
        setQuantity(data.quantity);
        setCountryManufactury(data.country_manufactury);
        setDatePurchase(data.date_purchase);
        setDateSale(data.date_sale);
        setPricePurchase(data.price_purchase);
        setPriceSale(data.price_sale);
        setPriceMy(data.price_my);
        setIsCar(data.is_car);
        setIsItem(data.is_item);
        setDescription(data.description);
        setIdMainCategory(data.id_main_category);
        setIdSub1Category(data.id_sub1_category);
        setIdSub2Category(data.id_sub2_category);

        // show the correct id on inputCat
        if (data.id_sub1_category === 0 && data.id_sub2_category === 0) {
          setIdCat(data.id_main_category);
        } else if (data.id_sub2_category === 0) {
          setIdCat(data.id_sub1_category);
        } else {
          setIdCat(data.id_sub2_category);
        }

        setIsLoading(false);

        document.querySelector('#li').appendChild(assembleCategoriesUl(0, response.data, handleCategory));
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

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
      document.getElementById('name').style.borderColor = '#ff0000';
    }

    if (quantity.length < 1) {
      toast.error('Quantidade precisa ser preenchido');
      formErrors = true;
      document.getElementById('quantity').style.borderColor = '#ff0000';
    }

    const inputCategory = document.getElementById('inputCat');
    if (idMainCategory === 0) {
      toast.error('Categoria deve ser selecionada');
      formErrors = true;
      inputCategory.style.borderColor = '#ff0000';
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      let kmZ = km ? km.replace(/_/g, '') : '';

      if (id) {
        await axios.put(`/items/${id}`, {
          name,
          km: kmZ,
          other,
          brand,
          date_release: dateRelease,
          new: newUsed,
          custom_code: customCode,
          quantity,
          country_manufactury: countryManufactury,
          date_purchase: datePurchase,
          date_sale: dateSale,
          price_purchase: pricePurchase,
          price_sale: priceSale,
          price_my: priceMy,
          is_car: isCar,
          is_item: isItem,
          description,
          id_main_category: idMainCategory,
          id_sub1_category: idSub1Category,
          id_sub2_category: idSub2Category,
        });
        toast.success('Editado com sucesso!');
      } else {
        const { data } = await axios.post(`/items/`, {
          name,
          km: kmZ,
          other,
          brand,
          date_release: dateRelease,
          new: newUsed,
          custom_code: customCode,
          quantity,
          country_manufactury: countryManufactury,
          date_purchase: datePurchase,
          date_sale: dateSale,
          price_purchase: pricePurchase,
          price_sale: priceSale,
          price_my: priceMy,
          is_car: isCar,
          is_item: isItem,
          description,
          id_main_category: idMainCategory,
          id_sub1_category: idSub1Category,
          id_sub2_category: idSub2Category,
        });
        toast.success('Criado com sucesso!');
        isWish ? history.push(`/wish/${isWish}/${data.id}`) : history.push(`/item/${data.id}/edit`);
      }
      setIsLoading(false);
      document.querySelector('#li').appendChild(assembleCategoriesUl(0, categories, handleCategory));
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
  }

  let title1 = '';
  let title2 = '';
  if (isWish) {
    title1 = id ? `Editar Desejo` : 'Novo Desejo';
  } else if (!isWish) {
    title2 = id ? `Editar Item` : 'Novo Item';
  }
  document.title = `${title1 || title2} - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && get(categories[0], 'name', false) && (
        <Container>
          <h1>{title1 || title2}</h1>
          {id && (
            <Picture>
              {fotoVideo ? (
                <img src={fotoVideo} alt={fotoVideo} />
              ) : (
                <img src={`${api_url}/images/no-image.jpg`} alt="imageVideo" />
              )}

              <Link to={`/imageVideo/${id}`}>
                <FaEdit size={24} />
              </Link>
            </Picture>
          )}

          <Form onSubmit={handleSubmit}>
            <div id="divForm">
              <label htmlFor="name" title="Campo Obrigatório">
                *Nome:
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do item"
                />
              </label>

              <label htmlFor="codCustom">
                Cód Custom:
                <input
                  id="customCode"
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Código customizado"
                />
              </label>

              <label htmlFor="isCar">
                É um carro?:
                <select id="isCar" value={isCar} onChange={(e) => setIsCar(e.target.value)}>
                  <option value>Sim</option>
                  <option value={false}>Não</option>
                </select>
              </label>

              <label htmlFor="km">
                Km:
                <InputMask
                  mask="999999"
                  id="km"
                  type="text"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  placeholder="120348"
                />
              </label>

              <label htmlFor="dateRelease">
                Ano de Produção:
                <InputMask
                  mask="9999"
                  id="dateRelease"
                  type="text"
                  value={dateRelease}
                  onChange={(e) => setDateRelease(e.target.value)}
                  placeholder="Ano de Produção"
                />
              </label>

              <label htmlFor="other">
                Outro:
                <input
                  id="other"
                  type="text"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  placeholder="Plataforma, Info"
                />
              </label>

              <label htmlFor="brand">
                Marca:
                <input
                  id="brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Marca do item"
                />
              </label>
              <label htmlFor="quantity" title="Campo Obrigatório">
                *Quantidade:
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantidade"
                />
              </label>
              <label htmlFor="countryManufactury">
                Local de Fabricação:
                <input
                  id="countryManufactury"
                  type="text"
                  value={countryManufactury}
                  onChange={(e) => setCountryManufactury(e.target.value)}
                  placeholder="Onde foi fabricado"
                />
              </label>
              <label htmlFor="newUsed">
                Estado:
                <select id="newUsed" value={newUsed} onChange={(e) => setNewUsed(e.target.value)}>
                  <option value>Novo</option>
                  <option value={false}>Usado</option>
                </select>
              </label>
              {!isWish && (
                <>
                  <label htmlFor="datePurchase">
                    Data de Aquisição:
                    <InputMask
                      mask="99/99/9999"
                      id="datePurchase"
                      type="text"
                      value={datePurchase}
                      onChange={(e) => setDatePurchase(e.target.value)}
                      placeholder="00/00/00"
                    />
                  </label>
                  <label htmlFor="dateSale">
                    Data da Venda:
                    <InputMask
                      mask="99/99/9999"
                      id="dateSale"
                      type="text"
                      value={dateSale}
                      onChange={(e) => setDateSale(e.target.value)}
                      placeholder="00/00/00"
                    />
                  </label>
                  <label htmlFor="pricePurchase">
                    Valor de Aquisição:
                    <CurrencyInput
                      id="pricePurchase"
                      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                      prefix="R$"
                      defaultValue={pricePurchase}
                      decimalsLimit={2}
                      onValueChange={(value) => {
                        setPricePurchase(value);
                      }}
                      placeholder="1000"
                    />
                  </label>
                  <label htmlFor="priceSale">
                    Valor de Venda:
                    <CurrencyInput
                      id="priceSale"
                      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                      prefix="R$"
                      defaultValue={priceSale}
                      decimalsLimit={2}
                      onValueChange={(value) => setPriceSale(value)}
                      placeholder="1000"
                    />
                  </label>
                </>
              )}
              <label htmlFor="priceMy">
                Meu Valor:
                <CurrencyInput
                  id="priceMy"
                  intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                  prefix="R$"
                  defaultValue={priceMy}
                  decimalsLimit={2}
                  onValueChange={(value) => setPriceMy(value)}
                  placeholder="1000"
                />
              </label>
            </div>

            <label htmlFor="description">
              Descrição:
              <textarea
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição .."
              />
            </label>
            <CategorySelect>
              <ul>
                <li id="li" style={{ textAlign: 'left' }}>
                  <strong title="Campo Obrigatório">*Categoria:</strong>
                  <span>
                    <FaAngleDown />
                  </span>
                </li>
              </ul>
            </CategorySelect>
            <CategoryMobile categories={categories} handle={handleCategory} />
            <input id="inputCat" type="text" value={idCat} placeholder="Categoria" disabled="disabled" />
            {isWish && (
              <label htmlFor="isItem">
                Transferir para Item?
                <select id="isItem" value={isItem} onChange={(e) => setIsItem(e.target.value)}>
                  <option value>Sim</option>
                  <option value={false}>Não</option>
                </select>
              </label>
            )}

            <button type="submit" id="save">
              Salvar
            </button>
          </Form>
        </Container>
      )}
    </MainContainer>
  );
}

ItemNewEdit.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
