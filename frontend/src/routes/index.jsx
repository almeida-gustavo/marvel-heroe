/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home/index';
import MarvelHeroes from '../pages/Heroes/MarvelHeroes';
import OneHeroe from '../pages/Heroes/OneHeroe';
import MarvelComics from '../pages/Comics/MarvelComics';
import OneComic from '../pages/Comics/OneComic';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/heroes" exact component={MarvelHeroes} />
        <Route path="/heroes/:id" component={OneHeroe} />
        <Route path="/comics" exact component={MarvelComics} />
        <Route path="/comics/:id" exact component={OneComic} />
    </Switch>
);

export default Routes;
