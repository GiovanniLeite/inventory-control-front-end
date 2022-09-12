import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container } from './styled';

export default function File({ match, history }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [fileItem, setFileItem] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/items/${id}`);
        setFileItem(get(data, 'Files[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter arquivo');
        setIsLoading(false);
      }
    };

    getData();
  }, [id, history]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setFileItem(fileURL);

    const formData = new FormData();
    formData.append('id_item', id);
    formData.append('file', file);

    try {
      setIsLoading(true);

      await axios.post('/files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Arquivo enviado com sucesso!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar arquivo.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  document.title = `Uploads - Inventory`;

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />
        <h2>Arquivos</h2>
        <form>
          <label htmlFor="file">
            {fileItem ? <img src={fileItem} alt="File" /> : 'Selecionar'}
            <input type="file" id="file" onChange={handleChange} />
          </label>
        </form>
      </Container>
    </MainContainer>
  );
}

File.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
