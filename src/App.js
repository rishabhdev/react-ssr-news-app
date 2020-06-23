import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './modules/common/components/Head';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './modules/main/pages/main/Main'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className="app">
    <Head />
    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/news" component={LoadableHome} />
      </Switch>
    </main>

    <footer />
  </div>
);

export default App;
