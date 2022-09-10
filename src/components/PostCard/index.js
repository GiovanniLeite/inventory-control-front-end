import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Container,
  PostCardCategory,
  PostCardCover,
  PostCardHeading,
} from './styled';

export default function PostCard({ slug, title, cover, brand }) {
  return (
    <Container>
      <PostCardCover>
        <Link to={`/item/${slug}`}>
          <img src={cover} alt={title} />
        </Link>
      </PostCardCover>
      <PostCardHeading>
        <Link to={`/item/${slug}`}>{title}</Link>
      </PostCardHeading>
      <br />
      <PostCardCategory>{brand || '-'}</PostCardCategory>
    </Container>
  );
}

PostCard.defaultProps = {
  slug: 'Este aqui',
  title: 'Este aqui',
  cover: 'Este aqui',
  brand: 'Este aqui',
};

PostCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  brand: PropTypes.string,
};
