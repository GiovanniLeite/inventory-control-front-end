import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Home from '../pages/Home';
import Item from '../pages/Item';
import ItemNewEdit from '../pages/ItemNewEdit';
import ImageVideo from '../pages/ImageVideo';
import Category from '../pages/Category';
import Categories from '../pages/Categories';
import Wishlist from '../pages/Wishlist';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />

      {/* Shows an Item */}
      <MyRoute exact path="/item/:id" component={Item} isClosed />
      {/* New Item */}
      <MyRoute exact path="/item-new/" component={ItemNewEdit} isClosed />
      {/* Edit Item */}
      <MyRoute exact path="/item/:id/edit" component={ItemNewEdit} isClosed />

      {/* List of Wishes */}
      <MyRoute exact path="/wishlist/" component={Wishlist} isClosed />
      {/* New Wish */}
      <MyRoute exact path="/wish/:isWish" component={ItemNewEdit} isClosed />
      {/* Edit Wish */}
      <MyRoute exact path="/wish/:isWish/:id" component={ItemNewEdit} isClosed />

      {/* New Image/Video */}
      <MyRoute exact path="/imageVideo/:id" component={ImageVideo} isClosed />

      {/* List of Categories */}
      <MyRoute exact path="/categories/" component={Categories} isClosed />
      {/* New Category */}
      <MyRoute exact path="/category/" component={Category} isClosed />
      {/* Edit Category */}
      <MyRoute exact path="/category/:id/edit" component={Category} isClosed />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
