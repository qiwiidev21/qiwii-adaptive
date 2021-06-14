import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import HealthCare from "../screens/HealthCare";
import PhotoStudio from "../screens/PhotoStudio";
import Entertainment from "../screens/Entertainment";
import Events from "../screens/Event";
import Government from "../screens/Government";
import Finance from "../screens/Finance";
import Salon from "../screens/Salon";
import Schedule from "../screens/Schedule";
import Service from "../screens/Service";
import Services from "../screens/Services";
import TempatWisata from "../screens/TempatWisata";
import Movies from "../screens/Movies";

function BaseService() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Service} />
        <Route path={`${url}/:id/schedule`} component={Schedule} />
      </Switch>
    </Router>
  );
}

function RoutePemerintah() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Government} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteFinance() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Finance} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteSalon() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Salon} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteBengkel() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Services} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteMovies() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Movies} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteTempatWisata() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={TempatWisata} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RoutePhotoStudio() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={PhotoStudio} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteEvents() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={Events} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteKesehatan() {
  let { url } = useRouteMatch();
  return (
    <Router>
      <Switch>
        <Route path={`${url}`} component={HealthCare} />
        <Route path={`${url}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/adaptive"} component={Home} />
        <Route path={"/kesehatan"} component={RouteKesehatan} />
        <Route path={"/bioskop"} component={RouteMovies} />
        <Route path={"/tempatwisata"} component={RouteTempatWisata} />
        <Route path={"/entertainment"} component={Entertainment} />
        <Route path={"/photoStudio"} component={RoutePhotoStudio} />
        <Route path={"/events"} component={RouteEvents} />
        <Route path={"/pemerintahan"} component={RoutePemerintah} />
        <Route path={"/keuangan"} component={RouteFinance} />
        <Route path={"/kecantikan"} component={RouteSalon} />
        <Route path={"/services"} component={RouteBengkel} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
      </Switch>
    </Router>
  );
}

export default Routes;
