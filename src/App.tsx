import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './containers/NavContainer';
import HomePage from './pages/HomePage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import ArtistListPage from './pages/ArtistListPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import FessportPage from './pages/FessportPage';
import WishListPage from './pages/WishListPage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/festival/list" component={FestivalListPage} />
        <Route path="/festival/detail/:_id" component={FestivalDetailPage} />
        <Route path="/artist/list" component={ArtistListPage} />
        <Route path="/artist/detail/:_id" component={ArtistDetailPage} />
        <Route path="/fessport" component={FessportPage} />
        <Route path="/wishlist" component={WishListPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
