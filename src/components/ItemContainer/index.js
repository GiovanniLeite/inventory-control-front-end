import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { VscNewFile } from 'react-icons/vsc';
import { MdUpdate } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { AiOutlineCloseSquare, AiOutlinePrinter } from 'react-icons/ai';
import DialogActions from '@material-ui/core/DialogActions';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import apiUrl from '../../config/api';
import formatKm from '../../utils/formatKm';

import Reports from '../Reports';
import { ModifiedDialog } from '../../styles/global';
import {
  Container,
  ContainerDuo,
  ContainerDescription,
  DialogRel,
} from './styled';
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel';
import Loading from '../Loading';

export default function ItemContainer({ item }) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  let files = item.Files;

  if (!files.length)
    files = [
      { url: `${apiUrl}/images/no-image.jpg`, filename: 'no-image.jpg' },
    ];
  const media = files.map((file) => file.url);
  const mediaByIndex = (index) => media[index % media.length];
  const SLIDE_COUNT = media.length > 5 ? media.length : 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const [open, setOpen] = React.useState(false);
  const [openRel, setOpenRel] = React.useState(false);

  const handleDelete = async () => {
    setOpen(false);

    try {
      setIsLoading(true);
      await axios.delete(`/items/${item.id}`);
      setIsLoading(false);
      history.push('/');
      toast.warning(`${item.id} ${item.name} foi apagado!`);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir item');
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ContainerDuo>
        <div className="imagesItem">
          <div className="contentCarousel">
            <h2>{item.name}</h2>
            <EmblaCarousel
              slides={slides}
              mediaByIndex={mediaByIndex}
              className="embla-div"
            />
            <ul>
              <li>
                <Link to="/item-new/" title="Novo">
                  <VscNewFile />
                </Link>
              </li>
              <li>
                <Link to={`/item/${item.id}/edit`} title="Alterar">
                  <MdUpdate />
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  to={`/item/${item.id}/delete`}
                  title="Excluir"
                >
                  <IoMdTrash />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  title="Relatório"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenRel(true);
                  }}
                >
                  <AiOutlinePrinter />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="dataItem">
          <h2>{item.name}</h2>
          <div>
            <label>
              Cód:
              <h5>{item.id}</h5>
            </label>
            <label>
              Cód. Customizado:
              <h5>{item.custom_code || '-'}</h5>
            </label>
            <label>
              Carro:
              <h5>{item.is_car ? 'Sim' : 'Não'}</h5>
            </label>
            <label>
              Km:
              <h5>{item.km ? formatKm(item.km) : '-'}</h5>
            </label>
            <label>
              {item.is_car ? 'Ano de Produção:' : 'Ano de Lançamento:'}
              <h5>{item.date_release || '-'}</h5>
            </label>
            <label>
              Outro:
              <h5>{item.other || '-'}</h5>
            </label>
            <label>
              Marca:
              <h5>{item.brand || '-'}</h5>
            </label>
            <label>
              Quantidade:
              <h5>{item.quantity}</h5>
            </label>
            <label>
              Local de Fabricação:
              <h5>{item.country_manufactury || '-'}</h5>
            </label>
            <label>
              Estado:
              {item.new ? <h5>Novo</h5> : <h5>Usado</h5>}
            </label>
            <label>
              Data da Aquisição:
              <h5>{item.date_purchase || '-'}</h5>
            </label>
            <label>
              Data de Venda:
              <h5>{item.date_sale || '-'}</h5>
            </label>
            <label>
              Valor da Aquisição:
              <h5>R$ {item.price_purchase || '-'}</h5>
            </label>
            <label>
              Valor de Venda:
              <h5>R$ {item.price_sale || '-'}</h5>
            </label>
            <label title="Quanto acho que vale">
              Meu valor:
              <h5>R$ {item.price_my || '-'}</h5>
            </label>
          </div>
        </div>
      </ContainerDuo>
      <ContainerDescription>
        <label htmlFor="description">
          Descrição Adicional:
          <p>{item.description || '-'}</p>
        </label>
      </ContainerDescription>
      <ModifiedDialog
        open={open}
        onClose={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <h3>Excluir o registro abaixo?</h3>
        <span />
        <h5>{`${item.id} ${item.name}`}</h5>
        <DialogActions>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            title="Cancelar"
          >
            Cacelar
          </button>
          <button onClick={handleDelete} title="Excluir">
            Excluir
          </button>
        </DialogActions>
      </ModifiedDialog>
      <DialogRel
        open={openRel}
        onClose={(e) => {
          e.preventDefault();
          setOpenRel(false);
        }}
      >
        <DialogActions>
          <button
            className="close"
            onClick={(e) => {
              e.preventDefault();
              setOpenRel(false);
            }}
            title="Fechar"
          >
            <AiOutlineCloseSquare />
          </button>
        </DialogActions>
        <Reports />
      </DialogRel>
    </Container>
  );
}

ItemContainer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    km: PropTypes.string,
    other: PropTypes.string,
    brand: PropTypes.string,
    date_release: PropTypes.string,
    new: PropTypes.bool,
    custom_code: PropTypes.string,
    quantity: PropTypes.number,
    country_manufactury: PropTypes.string,
    date_purchase: PropTypes.string,
    date_sale: PropTypes.string,
    price_purchase: PropTypes.string,
    price_sale: PropTypes.string,
    price_my: PropTypes.string,
    is_car: PropTypes.bool,
    description: PropTypes.string,
    Files: PropTypes.instanceOf(Array),
  }).isRequired,
};
