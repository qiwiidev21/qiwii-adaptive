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
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Service} />
        <Route path={`${path}/:id/schedule`} component={Schedule} />
      </Switch>
    </Router>
  );
}

function RoutePemerintah() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Government} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteFinance() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Finance} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteSalon() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Salon} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteBengkel() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Services} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteMovies() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Movies} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteTempatWisata() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={TempatWisata} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RoutePhotoStudio() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={PhotoStudio} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteEvents() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={Events} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function RouteKesehatan() {
  let { path } = useRouteMatch();
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route path={`${path}`} component={HealthCare} />
        <Route path={`${path}/:id`} component={BaseService} />
      </Switch>
    </Router>
  );
}

function Routes() {
  return (
    <Router basename={"/adaptive"}>
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
