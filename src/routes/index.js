import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Item from '../pages/Item';
import ItemEdit from '../pages/ItemEdit';
import File from '../pages/File';
import Category from '../pages/Category';
import Categories from '../pages/Categories';
import Wishlist from '../pages/Wishlist';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} isClosed />
      <PrivateRoute exact path="/login/" component={Login} isClosed={false} />
      <PrivateRoute
        exact
        path="/register/"
        component={Register}
        isClosed={false}
      />

      {/* Shows an Item */}
      <PrivateRoute exact path="/item/:id" component={Item} isClosed />
      {/* New Item */}
      <PrivateRoute exact path="/item-new/" component={ItemEdit} isClosed />
      {/* Edit Item */}
      <PrivateRoute exact path="/item/:id/edit" component={ItemEdit} isClosed />

      {/* List of Wishes */}
      <PrivateRoute exact path="/wishlist/" component={Wishlist} isClosed />
      {/* New Wish */}
      <PrivateRoute exact path="/wish/:isWish" component={ItemEdit} isClosed />
      {/* Edit Wish */}
      <PrivateRoute
        exact
        path="/wish/:isWish/:id"
        component={ItemEdit}
        isClosed
      />

      {/* New file */}
      <PrivateRoute exact path="/file/:id" component={File} isClosed />

      {/* List of Categories */}
      <PrivateRoute exact path="/categories/" component={Categories} isClosed />
      {/* New Category */}
      <PrivateRoute exact path="/category/" component={Category} isClosed />
      {/* Edit Category */}
      <PrivateRoute
        exact
        path="/category/:id/edit"
        component={Category}
        isClosed
      />

      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
