import PropTypes from 'prop-types';
import { FaAngleDown, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container } from './styled';

export default function CategorySelector({ categories, handle, asterisk }) {
  const handleCategory = (e, button) => {
    try {
      let section;

      button
        ? (section = e.target.nextElementSibling)
        : (section = e.target.parentNode.parentNode);

      section.style.display === 'block'
        ? (section.style.display = 'none')
        : (section.style.display = 'block');
    } catch {
      toast.error('Houve um erro, recarregue a página');
    }
  };

  const handleSub = async (id) => {
    let subs = document.querySelectorAll(`.sub${id}`);

    if (subs[0]) {
      // to hide subsub if exists
      if (subs[0].style.display === 'block') {
        const subsubs = document.querySelectorAll(`.subsub${id}`);
        if (subsubs) {
          subs = [...subs, ...subsubs];
          for (const sub of subs) {
            sub.style.display = 'none';
          }
        }
      } else {
        for (const sub of subs) {
          sub.style.display = 'block';
        }
      }
    }
  };

  return (
    <Container>
      <button
        className="categorySelector"
        type="button"
        onClick={(e) => handleCategory(e, true)}
      >
        {asterisk && '*'}Categorias
        <FaAngleDown />
      </button>
      <section>
        {categories.map((category) => {
          let categoryType = 'main';

          if (category.id_parent !== 0 && category.id_parent_parent === 0) {
            // subcategory1
            categoryType = `sub sub${category.id_parent}`;
          } else if (
            category.id_parent !== 0 &&
            category.id_parent_parent !== 0
          ) {
            // subcategory2
            categoryType = `subsub sub${category.id_parent} subsub${category.id_parent_parent}`;
          }

          return (
            <div key={String(category.id)} className={categoryType}>
              <a
                className="subcategory"
                onClick={(e) => {
                  e.preventDefault();
                  handleSub(category.id);
                }}
                title="Subcategorias"
              >
                <FaRegArrowAltCircleDown />
              </a>

              <a
                onClick={(e) => {
                  e.preventDefault();
                  handle(
                    category.name,
                    category.id,
                    category.id_parent,
                    category.id_parent_parent,
                  );
                  handleCategory(e, false);
                }}
              >
                {category.name}
              </a>
            </div>
          );
        })}
      </section>
    </Container>
  );
}

CategorySelector.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      id_parent: PropTypes.number,
      id_parent_parent: PropTypes.number,
    }),
  ).isRequired,
  handle: PropTypes.func,
  asterisk: PropTypes.bool,
};
