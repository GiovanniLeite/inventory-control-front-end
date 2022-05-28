import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, Title, Form } from './styled';

export default function ImageVideo({ match, history }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [imageVideo, setImageVideo] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/items/${id}`);
        setImageVideo(get(data, 'FotoVideos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id, history]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setImageVideo(fileURL);

    const formData = new FormData();
    formData.append('id_item', id);
    formData.append('fotoVideo', file);

    try {
      setIsLoading(true);

      await axios.post('/fotoVideos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto/Video enviada com sucesso!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto/video.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  document.title = `Uploads - Inventory`;

  return (
    <MainContainer>
      <Container>
        <Loading isLoading={isLoading} />

        <Title>Fotos</Title>

        <Form>
          <label htmlFor="file">
            {imageVideo ? <img src={imageVideo} alt="File" /> : 'Selecionar'}
            <input type="file" id="file" onChange={handleChange} />
          </label>
        </Form>
      </Container>
    </MainContainer>
  );
}

ImageVideo.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
