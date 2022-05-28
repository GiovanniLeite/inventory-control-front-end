/**
 * Function that assembles categories and subcategories
 * param idParent, ID of the parent category whose subcategories will be searched
 * param arrayCategory Array with categories
 */
export function assembleCategoriesUl(idParent, arrayCategory, handle) {
  const ul = document.createElement('ul');
  ul.id = 'listCategory';
  for (const category of arrayCategory) {
    if (category.id_parent === idParent) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = category.name;
      a.onclick = (e) => {
        e.preventDefault();
        const list = document.querySelector('#listCategory');
        list.style.display = 'none';
        handle(category.name, category.id, category.id_parent, category.id_parent_parent);
        setTimeout(() => {
          list.removeAttribute('style');
        }, 100);
      };
      li.appendChild(a);
      li.appendChild(assembleCategoriesUl(category.id, arrayCategory, handle));
      ul.appendChild(li);
    }
  }
  return ul;
}
