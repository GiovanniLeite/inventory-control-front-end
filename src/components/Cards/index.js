import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styled';

export default function Cards({ slug, title, cover, brand }) {
  return (
    <Container>
      <div>
        <Link to={`/item/${slug}`}>
          <img src={cover} alt={title} />
        </Link>
      </div>
      <h2>
        <Link to={`/item/${slug}`}>{title}</Link>
      </h2>
      <br />
      <p>{brand || '-'}</p>
    </Container>
  );
}

Cards.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
};
