/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleDown, FaRegArrowAltCircleDown } from 'react-icons/fa';

import { CategoryM, Container, Category } from './styled';

export default function CategoryMobile({ categories, handle }) {
  const handleSub = async (id) => {
    let subs = document.getElementsByClassName(`sub${id}`);

    if (subs[0]) {
      // to hide subsub if exists
      if (subs[0].style.display === 'block') {
        const subsubs = document.getElementsByClassName(`subsub${id}`);
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

    /*
    main category does not hide subsub/subcategory2
    if (subs[0]) {
      for (const sub of subs) {
        sub.style.display === 'block' ? (sub.style.display = 'none') : (sub.style.display = 'block');
      }
    }
    */
  };

  const handleCategoryMobile = (e) => {
    const catM = e.target.nextElementSibling; //document.querySelector('#categoryM');
    catM.style.display === 'block' ? (catM.style.display = 'none') : (catM.style.display = 'block');
  };

  return (
    <Container>
      <button type="button" onClick={(e) => handleCategoryMobile(e)}>
        Categorias
        <FaAngleDown />
      </button>
      <section id="categoryM">
        <CategoryM>
          {categories.map((category) => {
            let categoryType = 'main';

            if (category.id_parent !== 0 && category.id_parent_parent === 0) {
              // subcategory1
              categoryType = `sub sub${category.id_parent}`;
            } else if (category.id_parent !== 0 && category.id_parent_parent !== 0) {
              // subcategory2
              categoryType = `subsub sub${category.id_parent} subsub${category.id_parent_parent}`;
            }

            return (
              <Category key={String(category.id)} className={categoryType}>
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
                    const catM = document.querySelector('#categoryM');
                    catM.style.display = 'none';
                    handle(category.name, category.id, category.id_parent, category.id_parent_parent);
                  }}
                >
                  {category.name}
                </a>
              </Category>
            );
          })}
        </CategoryM>
      </section>
    </Container>
  );
}

CategoryMobile.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      id_parent: PropTypes.number,
      id_parent_parent: PropTypes.number,
    }),
  ).isRequired,
  handle: PropTypes.func,
};
