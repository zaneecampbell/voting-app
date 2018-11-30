import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import CreatePage from '../components/CreatePage';
import ResultsPage from '../components/ResultsPage';
import VotePage from '../components/VotePage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <BrowserRouter history={history}>
    <div>
      <Switch>
        <Route path="/" component={CreatePage} exact={true}/>
        <Route path="/votepage" component={VotePage} />
        <Route path="/resultspage" component={ResultsPage} />
        <Route path="/notfoundpage" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
