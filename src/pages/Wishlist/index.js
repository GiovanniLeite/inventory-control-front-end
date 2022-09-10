import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaRegHeart, FaEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { toast } from 'react-toastify';
import DialogActions from '@material-ui/core/DialogActions';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { DialogZ } from '../../styles/global';
import { Container, ContainerZ, Picture, New } from './styled';

export default function Wishlist() {
  const dispatch = useDispatch();

  const [obj, setObj] = useState([]);
  const [currentWish, setCurrentWish] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        let response = await axios.get('/items');
        response = response.data.filter((e) => !e.is_item); // remove wishes
        setObj(response);
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
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/items/${currentWish[0]}`);
      const newObj = [...obj];
      newObj.splice(currentWish[2], 1);
      setObj(newObj);
      setIsLoading(false);
      toast.warning(`Cod: ${currentWish[0]} ${currentWish[1]} foi apagado!`);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir a categoria');
      }

      setIsLoading(false);
    }
    setOpen(false);
  };

  document.title = `Wishlist - Inventory`;

  return (
    <MainContainer>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Container>
          <h1>Lista de Desejos</h1>

          <New to={`/wish/${true}/`}>
            <FaRegHeart /> Novo
          </New>

          <ContainerZ>
            {obj.map((objZ, index) => (
              <div key={String(objZ.id)}>
                <Picture>
                  {get(objZ, 'Files[0].url', false) ? (
                    <img src={objZ.Files[0].url} alt="" />
                  ) : (
                    <FaRegHeart size={36} />
                  )}
                </Picture>

                <span>{objZ.name}</span>

                <section>
                  <Link to={`/wish/${true}/${objZ.id}`} title="Editar">
                    <FaEdit size={16} />
                  </Link>
                </section>

                <section>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentWish([objZ.id, objZ.name, index]);
                      setOpen(true);
                    }}
                    to={`/items/${objZ.id}`}
                    title="Excluir"
                  >
                    <IoMdTrash size={16} />
                  </Link>
                </section>
              </div>
            ))}
          </ContainerZ>
        </Container>
      )}
      <DialogZ
        open={open}
        onClose={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <h3>Excluir o registro abaixo?</h3>
        <span />
        <h5>{`${currentWish[0]} ${currentWish[1]}`}</h5>
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
      </DialogZ>
    </MainContainer>
  );
}
